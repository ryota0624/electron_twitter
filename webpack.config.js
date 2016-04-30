const path = require('path');
// const webpack = require('webpack');
module.exports = {
  entry: [path.resolve(__dirname, 'client', 'index.ts')],
  output: {
    filename: 'app.js', path: './public/',
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    // requireやimport時の拡張子を省略
    extensions: ['.tsx', '.ts', '', '.js', '.jsx'],
  },
};
