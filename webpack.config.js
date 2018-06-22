
// webpack 4.x 版本运行时，
// mode 为 production 即会启动压缩 JS 代码的插件
module.exports = (env, argv) => {
  return argv.mode === 'production'
    ? require('./build/webpack.prod.conf')
    : require('./build/webpack.dev.conf')
}