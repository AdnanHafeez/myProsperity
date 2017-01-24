const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const PathRewriterPlugin = require('webpack-path-rewriter');

const config = {
  // Entry points to the project
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/app/app.tsx')
  ],
  resolve: {
    root: path.resolve(__dirname),
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  // Server Configuration options
  devServer: {
    contentBase: 'src/www', // Relative directory for base of server
    devtool: 'eval',
    hot: true, // Live-reload
    inline: true,
    port: 3012, // Port Number
    host: '0.0.0.0' // Change to '0.0.0.0' for external facing server
  },
  devtool: 'eval',
  output: {
    path: buildPath, // Path of output file
    filename: 'app.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEVTOOLS__': true,
      '__INCLUDE_SERVICE_WORKER__': false,
      '__IS_CORDOVA_BUILD__': false
    }),
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoErrorsPlugin(),

    new PathRewriterPlugin({includeHash: true})
  ],
  module: {
    loaders: [
      {
        // React-hot loader and
        test: /\.js$/, // All .js files
        loaders: ['react-hot', 'babel-loader'], // react-hot is like browser sync and babel loads jsx and es6-7
        exclude: [nodeModulesPath]
      },
      {
        test: /\.tsx?$/, 
        loader: 'ts-loader',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
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
