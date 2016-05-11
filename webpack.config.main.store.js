const path = require('path');
const webpack = require('webpack');
var JsonpTemplatePlugin = webpack.JsonpTemplatePlugin;
var FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
var NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');
var ExternalsPlugin = webpack.ExternalsPlugin;

module.exports = {
  entry: [path.resolve(__dirname, 'client', 'storeContainer.ts')],
  output: {
    libraryTarget: 'commonjs2',
    filename: 'store.js', path: './mainProcess/',
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
        loader: 'babel!ts-loader',
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
      'auto-updater',
      'browser-window',
      'content-tracing',
      'dialog',
      'global-shortcut',
      'electron',
      'menu',
      'menu-item',
      'power-monitor',
      'protocol',
      'tray',
      'remote',
      'web-frame',
      'clipboard',
      'crash-reporter',
      'screen',
      'shell',
    ]),
    new NodeTargetPlugin(),
  ],
};
