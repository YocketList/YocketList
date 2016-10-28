const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    proxy: {
      '**': {target: 'http://localhost:3000', secure:false},
    }
  },
  // specifies the entry files
  // when provided with array it will go through all the files
  entry: {
    index: './client/index.jsx',
    player: './client/player.jsx',
  },
  // specifies where webpack will dump the compiled files
  output: { 
    path: './dist/',
    filename: '[name].bundle.js',
  },
  // loader specifies the preprocessor
  module: {
    loaders: [
      {
        test: /\.jsx?/, 
        loader: 'babel',
        include: path.join(__dirname, 'client')
      }
    ]
  }, 
  // additional functionality. htmlwebpackplugin or minify goes here
  plugins: [
    // Auto generate our html page https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'client/index.html'),
      appMountId: 'App',
      title: 'Client',
    }),
    new HtmlWebpackPlugin({
      filename: 'player.html',
      template: path.join(__dirname + '/client/player.html'),
      appMountId: 'Player',
      title: 'Player'
    })
  ]
};
