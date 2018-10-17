'use strict'
const path = require('path')
const autoprefixer = require('autoprefixer')
const srcPath = path.join(__dirname, '/../src')
const vendorPath = path.join(__dirname, '/../vendor')

const postCssOptions = {
  plugins: () => [
    autoprefixer({
      browsers: ['last 5 versions', 'ie 6-11']
    })
  ]
}

function getDefaultModules() {
  return {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: srcPath,
        use: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          }
        ]
      },
      {
        test: /\.sass/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      },
      {
        test: /\.less/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.styl/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: postCssOptions
          },
          {
            loader: 'stylus-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        use: { loader: 'file-loader' }
      }
    ]
  }
}
module.exports = {
  srcPath: srcPath,
  vendorPath: vendorPath,
  publicPath: '/assets/',
  port: 8000,
  getDefaultModules: getDefaultModules
}
