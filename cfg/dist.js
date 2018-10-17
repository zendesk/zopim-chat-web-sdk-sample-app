'use strict'

const path = require('path')
const webpack = require('webpack')

const baseConfig = require('./base')
const defaultSettings = require('./defaults')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
        SERVICES_CHECK_URL: JSON.stringify(process.env.SERVICES_CHECK_URL),
        BABEL_ENV: JSON.stringify('production'),
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: true,
          warnings: false,
          screw_ie8: true, // eslint-disable-line camelcase
          conditionals: true,
          unused: true,
          comparisons: true,
          sourceMap: true,
          sequences: true,
          dead_code: true, // eslint-disable-line camelcase
          evaluate: true,
          compress: {
            drop_console: true // eslint-disable-line camelcase
          },
          if_return: true, // eslint-disable-line camelcase
          join_vars: true, // eslint-disable-line camelcase
          output: { comments: false }
        }
      })
    ]
  },
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
