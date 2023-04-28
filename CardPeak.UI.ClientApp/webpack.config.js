require('babel-polyfill');

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

const appJs = "app-[hash].js";
const appCss = "app-[hash].css";
const vendorJs = "vendor-[hash].js";
const vendorCss = "vendor-[hash].css";

const assetsCss = 'assets/css';
const assetsJs = 'assets/script';
const assetsContent = 'assets/content';

let apiHost = "http://localhost:3001/api";
let buildPath = path.join(__dirname, "./build");

if (isProduction) {
    apiHost = "/api";
    buildPath = path.join(__dirname, "./release/", version);
}

console.log("build path: " + buildPath);
console.log("environment: " + nodeEnv);
console.log("version: " + version);
console.log("apiHost: " + apiHost);
console.log("bundling...");

const extractLess = new ExtractTextPlugin({
    filename: path.join(assetsCss, appCss),
    disable: process.env.NODE_ENV === "dev",
    allChunks: true
});

const extractCSS = new ExtractTextPlugin({
    filename: path.join(assetsCss, vendorCss),
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
        filename: path.join(assetsJs, vendorJs)
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
        use: 'file-loader?name=[name].[ext]'
    },
    {
        test: /\.(woff|woff2|eot|ttf|svg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    outputPath: assetsContent + '/'
                }
            }]
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
            'babel-polyfill',
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
        publicPath: '/',
        filename: path.join(assetsJs, appJs)
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