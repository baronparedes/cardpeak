const webpack = require('webpack');
const path = require('path');

const buildNumber = Date.now();
const packageJson = require('./package.json');
const version = packageJson.version + "." + buildNumber;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const nodeEnv = process.env.NODE_ENV || 'dev';
const isProduction = nodeEnv === 'production';

const sourcePath = path.join(__dirname, "./src");
const imagePath = path.join(__dirname, "./src/img");
let buildPath = path.join(__dirname, "./build");

if (isProduction) {
    buildPath = path.join(__dirname, "./release/", version);
}

let apiHost = "api";
const setApiHost = function () {
    if (nodeEnv === 'production') {
        apiHost = "api";
    }
    else if (nodeEnv === 'dev') {
        apiHost = "http://localhost:3001/api";
    }
};
setApiHost();

console.log("bundling...");
console.log("environment: " + nodeEnv);
console.log("version: " + version);
console.log("api: " + apiHost);

const extractLess = new ExtractTextPlugin({
    filename: "app-[hash].css",
    disable: process.env.NODE_ENV === "dev",
    allChunks: true
});

const extractCSS = new ExtractTextPlugin({
    filename: "vendor-[hash].css",
    disable: process.env.NODE_ENV === "dev",
    allChunks: true
});

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        path: buildPath,
        filename: 'index.html',
        favicon: "img/favicon.ico"
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor-[hash].js'
    }),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv)
        },
        __NODE_ENV__: JSON.stringify(nodeEnv),
        __API_BASE_URL__: JSON.stringify(apiHost),
        __VERSION__: JSON.stringify(version)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                autoprefixer({
                    browsers: [
                        'last 3 version',
                        'ie >= 10'
                    ]
                })
            ],
            context: sourcePath
        }
    }),
    extractCSS,
    extractLess
];

const loaders = [
    {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        use: [
            'ts-loader'
        ]
    },
    {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: "source-map-loader"
    },
    {
        test: /\.css$/,
        use: extractCSS.extract({
            use: ["css-loader"],
            fallback: "style-loader"
        })
    },
    {
        test: /\.less$/,
        exclude: /(node_modules)/,
        use: extractLess.extract({
            use: ["css-loader", "less-loader"],
            fallback: "style-loader"
        })
    },
    {
        test: /\.(jpg|png)$/,
        use: "file-loader"
    },
    {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }
];

if (isProduction) {
    // PROD plugins
    plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            output: {
                comments: false
            }
        })
    );
}
else {
    // DEV plugins
    plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = {
    devtool: isProduction ? 'eval' : 'source-map',
    context: sourcePath,
    entry: {
        js: './index.tsx',
        vendor: [
            'axios',
            'chart.js',
            'classnames',
            'moment',
            'react',
            'react-bootstrap',
            'react-bootstrap-date-picker',
            'react-chartjs-2',
            'react-dom',
            'react-redux',
            'react-router',
            'react-router-bootstrap',
            'react-router-dom',
            'redux-actions',
            'redux-logger',
            'redux-thunk'
        ]
    },
    output: {
        path: buildPath,
        publicPath: '',
        filename: 'app-[hash].js'
    },
    module: {
        loaders
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.ts', '.tsx', '.css', '.less', '.js'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    },
    plugins
};