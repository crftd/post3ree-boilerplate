import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import FaviconPlugin from 'favicons-webpack-plugin';
import stylelint from 'stylelint';
import pcssImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import pcssClearfix from 'postcss-clearfix';
import pcssVars from 'postcss-simple-vars';
import pcssFonts from 'postcss-font-magician';

const appEntry = './client/app';

const defineEnvPlugin = new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV === 'development'
});

const entryScripts = {
    client: appEntry
};

const output = {
    filename: '[name].js',
    chunkFilename: '[id].js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
};

const plugins = [
    defineEnvPlugin,
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.js'
    }),
    new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
    }),
    new FaviconPlugin({
        logo: './fav.png',
        prefix: 'icons/'
    })
];

const modulePreLoaders = [
    {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        exclude: /node_modules/,
        include: __dirname
    }
];

const moduleLoaders = [
    {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname
    },
    {
        test: /\.pcss$/i,
        loader: ExtractTextPlugin.extract({
            notExtractLoader: 'style-loader',
            loader: 'css?modules&importLoaders=1&localIdentName=[name]_[local]__[hash:base64]!postcss'
        })
    },
    {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract({ notExtractLoader: 'style-loader', loader: 'css-loader' })
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
    output,
    plugins,
    module: {
        preLoaders: modulePreLoaders,
        loaders: moduleLoaders
    },
    postcss: () =>
        [stylelint, pcssImport({
            path: [path.resolve(__dirname, 'node_modules')]
        }), autoprefixer(({ browsers: ['> 5%', 'ie >= 8', 'Firefox < 20'] })), precss, pcssClearfix, pcssVars, pcssFonts]
};