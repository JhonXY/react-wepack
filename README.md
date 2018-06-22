### babel
### preset
> 相当于插件包

> 在进行了诸多的尝试之后，我发现还是直接使用creat-react-app的作者提供一个presets效果最好，所以就直接拿来用了，
> 之后添加了一些plugins做了一些优化，有效得减少了打包体积
#### 通用插件
syntax-dynamic-import: 按需加载必要（babel-preset-react-app中包括了已经)
transform-class-properties: 主要是为了使用直接在class中 state = {} 的这种语法，同时也解决了箭头函数定义方法直接引用this的便利形式的兼容，貌似有人觉得这样不太好（babel-preset-react-app中包括了已经）
external-helpers: 有效得减少打包体积（将babel需要的helpers整合，transform-runtime中的helpers选项貌似效果相同）
transform-runtime: 更好的polyfills，更好地模块化，有效减少打包体积（需要在生产生环境添加babel-runtime以生成模块）[这里](https://blog.csdn.net/a324539017/article/details/52824189)记录了使用这个插件的一些问题以及可以改动的地方，
这里需要注意的是，babel-preset-react-app在使用该插件的时候关闭了 helpers, polyfill 这两个有利于减少打包体积的选项，具体是为了什么暂时不清楚，个人觉得开启helpers好一些，效果很显著。

> 总知create-react-app作者考虑得肯定比我多，之后为了兼容可以另行添加。
> 在处理兼容方面，直接使用babel-polyfill会比transform-runtime要更好些

#### 生产用插件
transform-remove-console: 自动去除console.log（需要NODE_ENV=production）
transform-react-constant-elements: 识别并转换可以转成常量的组件（该插件貌似有些问题，被作者禁用了）
transform-react-pure-class-to-function: 将class的组件尽量转化为functional
