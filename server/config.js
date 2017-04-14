let path                    = require('path');
let chalk                   = require('chalk');
let webpack                 = require('webpack');
let ExtractTextPlugin       = require("extract-text-webpack-plugin");
let UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
let CopyWebpackPlugin       = require('copy-webpack-plugin');
let settings                = require('./settings');

module.exports = {
    entry: { 
        "main": './src/main/main.js',
        "main-browser-check": "./src/main/browser-check.js",
        "main-compatibility": './src/main-compatibility/main.js',
    },
    babel: {
        presets: ['es2015', 'stage-2']
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve('node_modules/')
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    //'file?hash=sha512&digest=hex&name=[name]-[hash].[ext]', // use this one if there are files that have the same name.
                    'file?name=resources/images/[name].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        alias: { 
            data: path.resolve(__dirname, '../data')
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