const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isDev = process.env.NODE_ENV === "development"

function optimization(){
    const config ={}

    if(!isDev){
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        main: [ "./index.jsx"],
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        port: 4100,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({ template: "./index.html"}), 
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [{loader: MiniCssExtractPlugin.loader, options: {hmr: isDev, reloadAll: true}}, "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                } 
            },
            {
                test: /\.ttf$/,
                use: ["file-loader"]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/, 
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets: [ "@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                } 
            }
        ]
    }
}