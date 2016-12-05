var path =  require('path');
var webpack = require('webpack');
//var nodeExternals = require('webpack-node-externals');

module.exports = {
    context: __dirname,
    entry: "./src/js/app.js",
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                }
            }
        ]
    },
    output: {
        path: __dirname,
        filename: "/build/app.js"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
    ],
}