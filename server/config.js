'use strict';

const path                    = require('path');
const chalk                   = require('chalk');
const webpack                 = require('webpack');
const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const settings                = require('./settings');

module.exports = {
    entry: {
        "main": './src/main/main.js',
        "main-browser-check": "./src/main/browser-check.js",
        "main-compatibility": './src/main-compatibility/main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "resources/images/[name].[ext]"
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg:  { progressive:    true },
                                gifsicle: { interlaced:     true },
                                optipng:  { optimizationLevel: 7 }
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            data: path.resolve(__dirname, '../data.json')
        }
    },
    output: {
        path: path.resolve(__dirname, `../${settings.outputFolder}/js`),
        filename: '[name].min.js'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compressor: { warnings: false }
        }),
        new UnminifiedWebpackPlugin(),
        new CopyWebpackPlugin([
            { "from": "lib/css",    "to": "../css"    },
            { "from": "lib/fonts",  "to": "../fonts"  },
            { "from": "lib/images", "to": "../images" }
        ]),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};
