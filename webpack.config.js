//

const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HtmlPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const PROD = process.env.NODE_ENV === "production"

const plugins = [
    new CopyPlugin([
        { from: "src/img/favicon.png", to: "img/favicon.png" },
        { from: "src/img/favicon.ico", to: "favicon.ico" },
    ]),
    new MiniCssExtractPlugin({
        filename: "bundle.css",
    }),
]

if ( PROD ) {
    plugins.push(new OptimizeCssAssetsPlugin({
        assetNameRegExp: /bundle\.css$/,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
            preset: [
                "default", { discardComments:{ removeAll:true } },
            ],
        },
    }))
}

plugins.push(new HtmlPlugin({
    template: "./src/html/index.html",
    filename: "index.html",
    hash: true,
    minify: PROD ? {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        maxLineLength: 1023,
        quoteCharacter: '"',
        removeComments: true,
        removeStyleLinkTypeAttributes: true,
        removeScriptTypeAttributes: true,
    } : false,
}))

module.exports = {
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
    plugins,
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src/js"),
                loader: "babel-loader",
            },
            {
                test: /\.styl$/,
                include: path.resolve(__dirname, "src/css"),
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "stylus-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|svg)$/,
                include: path.resolve(__dirname, "src/img"),
                use: {
                    loader: "file-loader",
                    options: {
                        name: "img/[hash].[ext]",
                    },
                },
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        port: 55000,
    },
}
