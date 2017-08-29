"use strict";

let isProduction = false;
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config");

const compiler = Webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
    contentBase: isProduction ? './build' : './src',
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: 'localhost',
    historyApiFallback: true,
    stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
        colors: {
            green: '\u001b[32m',
        },
    },
});

server.listen(3000, "127.0.0.1", function () {
    console.log("Starting server on http://localhost:3000");
});

