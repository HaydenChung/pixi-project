var path =  require('path');
var webpack = require('webpack');
//var nodeExternals = require('webpack-node-externals');

module.exports = {
    context: path.join(__dirname, "/src/js"),
    entry: "./app.js",
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
        path: path.join(__dirname, "/build"),
        filename: "app.js"
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