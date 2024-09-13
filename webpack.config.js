const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        index: "./src/js/index/index.js",
        pageTwo: "./src/js/pageTwo/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: isProduction ? "static/js/[name].[contentHash:4].js" : "static/js/[name].js",
        chunkFilename: isProduction ? "static/js/[name].[contentHash:4].chunk.js" : "static/js/[name].chunk.js",
        assetModuleFilename: "static/assets/[name].[hash:4].[ext][query]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                ]
            },
            {
                test: /\.less$/,
                use: [
                    // isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "首页",
            template: path.resolve(__dirname, "./public/index.html"),
            filename: "index.html",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            title: "page two",
            filename: "pageTwo.html",
            template: path.resolve(__dirname, "./public/pages/pageTwo.html"),
            chunks: ["pageTwo"]
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].css"
        })
    ],
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        runtimeChunk: "single",
        minimize: isProduction,
        minimizer: [
            new CssMinimizerPlugin()
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src")
        }
    },
    devtool: isProduction ? false : 'source-map',
    devServer: {
        host: "localhost",
        port: "8080",
        hot: true,
        open: true
    },
    mode: isProduction ? "production" : "development"
}