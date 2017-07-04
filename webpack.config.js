const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');

const clientSourcePath = path.join(__dirname, '/client');
const staticsPath = path.join(__dirname, '/dist');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const devServerPort = 3000;

const rules = [
  {
    test: /\.jsx?$/,
    include: [clientSourcePath, './server.js'],
    loader: 'babel-loader',
    options: {
      presets: ['es2015', 'react', 'stage-0'],
      plugins: ['transform-decorators-legacy'],
    },
  },
  {
    test: /\.pug$/,
    include: [clientSourcePath],
    loader: 'pug-loader',
  },
  {
    test: /\.html$/,
    include: [clientSourcePath],
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
  },
  {
    test: /\.pcss$/,
    include: [clientSourcePath],
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          query: {
            modules: true,
            sourceMaps: true,
            localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
        },
      ],
    }),
  },
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
  },
  {
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    use: [
      'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
      {
        loader: 'image-webpack-loader',
        query: {
          mozjpeg: {
            progressive: true,
          },
          gifsicle: {
            interlaced: false,
          },
          optipng: {
            optimizationLevel: 4,
          },
        },
      },
    ],
  },
  {
    test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: 'url-loader',
  },
  {
    test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
    use: 'file-loader',
  },
];

if (!isProd) {
  rules.push({
    test: /\.jsx?$/,
    enforce: 'pre',
    include: [clientSourcePath, './server.js'],
    loader: 'eslint-loader',
  });
}

console.info(`${nodeEnv} mode`);

const config = {
  devtool: isProd ? '' : 'eval-source-map',
  context: __dirname,
  entry: {
    bundle: !isProd ? [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=3000&overlay=false',
      'react-hot-loader/patch',
      './client/app.js',
    ] : [
      'babel-polyfill',
      './client/app.js',
    ],
    vendor: ['react'],
  },
  output: {
    path: staticsPath,
    publicPath: isProd ? '/dist/' : `//localhost:${devServerPort}/dist/`,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname, './node_modules'),
      clientSourcePath,
    ],
  },
  devServer: {
    contentBase: ['./client/'],
    historyApiFallback: true,
    host: 'localhost',
    publicPath: `//localhost:${devServerPort}/dist/`,
    port: devServerPort,
    compress: isProd,
    inline: !isProd,
    hot: true,
    stats: {
      assets: true,
      children: false,
      chunks: true,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      watchContentBase: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
  module: { rules },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      __DEV__: nodeEnv === 'development',
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    new webpack.NamedModulesPlugin(),
  ],
};

if (isProd) {
  config.plugins.push(
    new StatsPlugin('stats.json', {
      chunkModules: false,
      source: true,
      chunks: true,
      modules: false,
      assets: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  );
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

module.exports = config;
