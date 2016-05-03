const path = require('path');
const webpack = require('webpack');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
const ExternalsPlugin = webpack.ExternalsPlugin;

module.exports = {
  entry: [path.resolve(__dirname, 'subWindow', 'index.ts')],
  output: {
    filename: 'subWindow.js', path: './public/',
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    // requireやimport時の拡張子を省略
    extensions: ['.tsx', '.ts', '.js', '.jsx', ''],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExternalsPlugin('commonjs', [
      'app',
      'electron',
    ]),
    new NodeTargetPlugin(),
  ],
};
