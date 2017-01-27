const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'cordova/www');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const PathRewriterPlugin = require('webpack-path-rewriter');
const config = {
  entry: ['babel-polyfill', path.join(__dirname, '/src/app/app.tsx')],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  // Render source-map file for final build
  devtool: 'source-map',
  // output config
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js' // Name of output file
  },
  plugins: [
    new WebpackCleanupPlugin(),
    // http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEVTOOLS__': false,
      '__INCLUDE_SERVICE_WORKER__': false,
      '__IS_CORDOVA_BUILD__': true
    }),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),
    new PathRewriterPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, // All .js files
        loaders: ['babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loader: 'url?limit=100&name=static/[name]-[hash].[ext]'
        /*
        TODO upping limit cause images to in-line but this causes probems
        with webpack-path-rewriter https://github.com/skozin/webpack-path-rewriter
         */
      },
      {
        test: /\.(mp3|mp4)$/i,
        loader: 'file?name=dynamic/[name]-[hash].[ext]'
      },
      {
        test: /\.css/,
        loader: 'file?name=[name]-[hash].[ext]'
      },
      {
        test: /[.]html$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].html'
        })
      },
      {
        test: /[.]ico$/,
        loader: PathRewriterPlugin.rewriteAndEmit({
          name: '[name].ico'
        })
      }
    ]
  }
};

module.exports = config;
