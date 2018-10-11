'use strict'

const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./base')
const defaultSettings = require('./defaults')
const Dotenv = require('dotenv-webpack')

// Add needed plugins here
const BowerWebpackPlugin = require('bower-webpack-plugin')

const config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules(),
  postcss: defaultSettings.postcss
})

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
})

module.exports = config
