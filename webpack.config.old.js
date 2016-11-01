const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    // proxy: {
    //   '**': {target: 'http://localhost:3000', secure:false},
    // }
  },
  // specifies the entry files
  // when provided with array it will go through all the files
  entry: {
    index: './client/index.jsx'
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
        query: {
          presets: ['react', 'es2015']
        },
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
      title: 'Index',
    })
  ]
};
