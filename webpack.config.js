var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('config');

var isDev = (process.env.NODE_ENV === 'development');
var appEntry = './client/app';

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
        test: /\.p?css$/i,
        loader: ExtractTextPlugin.extract('style-loader', `css-loader?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss-loader`)
    },
    {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
            'file-loader?name=images/[name].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
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
    }
};
