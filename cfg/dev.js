'use strict'

const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./base')
const defaultSettings = require('./defaults')
const Dotenv = require('dotenv-webpack')

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
