const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
    entry: ["react-hot-loader/patch", "./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                        },
                    },
                    "postcss-loader",
                ],
                exclude: /\.module\.css$/,
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                    "postcss-loader",
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.svg$/,
                use: "file-loader",
            },
            {
                test: /\.png$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            mimetype: "image/png",
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: "./dist",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            templateContent: ({ htmlWebpackPlugin }) =>
                `<!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <meta name="viewport" content="width=device-width,initial-scale=1">
                            <title>Тест</title>
                        </head>
                        <body><div id="app"></div></body>
                    </html>`,
            filename: "index.html",
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
};

module.exports = config;
