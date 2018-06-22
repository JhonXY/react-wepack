// const webpack = require('webpack')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = {
  sourceMap: true
}

module.exports = merge.smart(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js' // 懒加载文件的名称
  },
  module: {
    rules : [
      {
        test: /.*\.(gif|png|jpe?g|svg|webp)(\?.*)?$/,
        // 详细设置: https://github.com/tcoopman/image-webpack-loader#usage
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: { // 压缩 jpeg 的配置
            progressive: true,
            quality: 75
          },
          optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
            enabled: false,
          },
          pngquant: { // 使用 imagemin-pngquant 压缩 png
            quality: '65-90',
            speed: 4
          },
          gifsicle: { // 压缩 gif 的配置
            interlaced: true, // 是否将gif转化为交错式gif使其加载时获得渐进加载的效果
            optimizationLevel: 3 // 优化等级1-3，等级越高越慢，可能效果越好
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  devtool: config.sourceMap ? "source-map" : false,
  optimization: {
    splitChunks: {
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 自定义vendor
        // vendor: {
        //   chunks: "initial",
        //   test: "vendor",
        //   name: "vendor", // 使用 vendor 入口作为公共部分
        //   enforce: true,
        // },
        // 默认引用node_modules的引入组成vendor文件
        // 这样vendor因为不需要经常改变，所以hash值不会一直随着打包改变
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -20,
          chunks: "all"
        }
      },
    },
    runtimeChunk: {
      name: entrypoint => `runtimechunk~${entrypoint.name}`
      // name: 'mainfiest'
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    // 压缩后将static中文件全部复制
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static'),
      to: 'static',
      ignore: ['.*']
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './index.html', // 配置文件模板
      minify: { // 压缩 HTML 的配置
        minifyCSS: true, // 压缩 HTML 中出现的 CSS 代码
        minifyJS: true, // 压缩 HTML 中出现的 JS 代码
        removeComments: true,
      },
      hash: true, // 是否为本页面所有资源文件添加一个独特的hash值
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash].css",
      chunkFilename: "[id]-[hash].css"
    }),
    new BundleAnalyzerPlugin()
  ]
})