'use strict'
let path = require('path')
let defaultSettings = require('./defaults')
const webpack = require('webpack')

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = []

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: 'widget.js',
    publicPath: defaultSettings.publicPath
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      utils: `${defaultSettings.srcPath}/utils/`,
      config:
        `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV,
      vendor: defaultSettings.vendorPath,
      React: __dirname + '/../node_modules/react'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ACCOUNT_KEY: JSON.stringify(process.env.ACCOUNT_KEY),
        BOT_ACCOUNT_KEY: JSON.stringify(process.env.BOT_ACCOUNT_KEY)
      }
    })
  ],
  module: {}
}
