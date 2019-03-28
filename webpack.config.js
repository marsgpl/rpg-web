//

const path = require("path")
// const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    entry: "./src/js/main.js",
    resolve: {
        modules: [
            path.resolve(__dirname, "src/js"),
            "node_modules",
        ],
        extensions: [
            ".js",
        ],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    plugins: [
        // new CopyWebpackPlugin([
        //     {
        //         from: "src/img",
        //         to: "img",
        //     },
        // ]),
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/index.html",
            filename: "index.html",
            hash: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /src\/js/,
                use: [
                    "babel-loader",
                ],
            },
            {
                test: /\.styl$/,
                include: /src\/css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "stylus-loader",
                ],
            },
            {
                test: /\.(png|jpe?g)$/,
                include: /src\/img/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "img/[hash].[ext]",
                    },
                },
            },
        ]
    }
}
