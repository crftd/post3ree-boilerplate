var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('config');

var isDev = (process.env.NODE_ENV === 'development');
var appEntry = './client/app';

var autoprefixer = require('autoprefixer');
var precss = require('precss');
var pcss_normalize = require('postcss-normalize');
var pcss_clearfix = require('postcss-clearfix');
var pcss_vars = require('postcss-simple-vars');
//var pcss_fonts = require('postcss-font-magician')(require('./fonts/fonts'));
var pcss_fonts = require('postcss-font-magician');


var defineEnvPlugin = new webpack.DefinePlugin({
    __DEV__: isDev
});

var entryScripts = [ appEntry ];
var output = {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
};

var plugins = [
    defineEnvPlugin,
    new ExtractTextPlugin('app.css', { allChunks: true })
];

var modulePreLoaders = [
    {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /node_modules/,
        include: __dirname
    }
];

var moduleLoaders = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
    },
    {
        test: /\.pcss$/i,
        loader: ExtractTextPlugin.extract('style-loader', `css-loader?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss-loader`)
    },
    {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    {
        test: /\.svg$/,
        loader: 'svg-inline'
    }
];

module.exports = {
    devtool: 'eval',
    entry: entryScripts,
    output: output,
    plugins: plugins,
    module: {
        preLoaders: modulePreLoaders,
        loaders: moduleLoaders
    },
    postcss: function() {
        return [autoprefixer, precss, pcss_clearfix, pcss_vars, pcss_normalize, pcss_fonts]
    }
};
