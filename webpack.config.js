const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pkg = require('./package.json')

const banner = `
${pkg.description}
v${pkg.version} ©${new Date().getFullYear()} ${pkg.author}
${pkg.homepage}
`.trim()

function resolve (dir, filename = '') {
  return path.join(__dirname, dir, filename)
}

const config = {
  entry: './index.js',
  output: {
    path: resolve('dist'),
    publicPath: '/',
    library: 'resloader',
    libraryTarget: 'umd',
    filename: 'resloader.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([resolve('dist')]),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin(banner)
  ]
}
module.exports = config
