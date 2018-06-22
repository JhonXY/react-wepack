// const webpack = require('webpack')
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    // main: '../src/index.js',
    main: path.resolve(__dirname, '../src/index.js'),
    // vendor: ['react',] // 如果自定义vendor则需要此项
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    // 不带后缀引用自动添加的类型
    extensions: ['.js', '.jsx', '.vue', '.json'],
    alias: {
      // 所有的src用@代替
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    // 配置哪些模块文件的内容不需要进行解析。
    // noParse: /jquery|lodash|react/, 
    rules: [
      {
        test: /\.jsx$/,
        include: [ path.resolve(__dirname, '../src') ],
        // use: [{ loader }]的简写
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        include: [ path.resolve(__dirname, '../src') ],
        loader: 'babel-loader'
      },
      {
        test: /.*\.(gif|png|jpe?g|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
    ],
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    
  ]
}