const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

// 用 smart API，当匹配规则相同且 use 值都是数组时，smart 会识别后处理
// 如果这里 use 的值用的是字符串或者对象的话，那么会替换掉原本的规则 use 的值...
// plugins数组则会和base合并
module.exports = merge.smart(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 自动添加全局变量
      '__DEV__': JSON.stringify(true),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './index.html', // 配置文件模板
    }),
    // 以下是启动hmr所必须的plugins
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
})