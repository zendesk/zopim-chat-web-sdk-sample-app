'use strict'

const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./defaults')

// Add needed plugins here
const BowerWebpackPlugin = require('bower-webpack-plugin')

const config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ACCOUNT_KEY: JSON.stringify(process.env.ACCOUNT_KEY),
        BOT_ACCOUNT_KEY: JSON.stringify(process.env.BOT_ACCOUNT_KEY),
        BOT_ENDPOINT: JSON.stringify(process.env.BOT_ENDPOINT),
        EMAIL_ADDRESS: JSON.stringify(process.env.EMAIL_ADDRESS),
        SERVICES_CHECK_URL: JSON.stringify(process.env.SERVICES_CHECK_URL)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules(),
  postcss: defaultSettings.postcss
})

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(config.additionalPaths, [path.join(__dirname, '/../src')])
})

module.exports = config
