'use strict'

const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./defaults')

const config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  mode: 'production',
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
})

// Add needed loaders to the defaults here
config.module.rules.push({
  test: /\.(js|jsx)$/,
  use: {
    loader: 'babel-loader'
  },
  include: [].concat(
    /*config.additionalPaths,*/ [path.join(__dirname, '/../src')]
  )
})

module.exports = config
