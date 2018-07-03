## babel
#### preset

在进行了诸多的尝试之后，我发现还是直接使用creat-react-app的作者提供一个presets效果最好，所以就直接拿来用了。

> 相当于插件包。
> 之后添加了一些plugins做了一些优化，有效得减少了打包体积

#### 通用插件
1. syntax-dynamic-import: 按需加载必要（babel-preset-react-app中包括了已经)
transform-class-properties: 主要是为了使用直接在class中 state = {} 的这种语法，同时也解决了箭头函数定义方法直接引用this的便利形式的兼容，貌似有人觉得这样不太好（babel-preset-react-app中包括了已经）
2. external-helpers: 有效得减少打包体积（将babel需要的helpers整合，transform-runtime中的helpers选项貌似效果相同）
3. transform-runtime: 更好的polyfills，更好地模块化，有效减少打包体积（需要在生产生环境添加babel-runtime以生成模块）[这里](https://blog.csdn.net/a324539017/article/details/52824189)记录了使用这个插件的一些问题以及可以改动的地方，
这里需要注意的是，babel-preset-react-app在使用该插件的时候关闭了 helpers, polyfill 这两个有利于减少打包体积的选项，具体是为了什么暂时不清楚，个人觉得开启helpers好一些，效果很显著。

> 总之create-react-app作者考虑得肯定比我多，之后为了兼容可以另行添加。
> 在需要处理严格的兼容方面，直接使用babel-polyfill会比transform-runtime要更好些

#### 生产用插件
1. transform-remove-console: 自动去除console.log（需要NODE_ENV=production）
2. transform-react-constant-elements: 识别并转换可以转成常量的组件（该插件貌似有些问题，被作者禁用了）
3. transform-react-pure-class-to-function: 将class的组件尽量转化为functional

## PostCss

暂时只使用了**autoprefixer**做浏览器前缀自动添加，关于浏览器的兼容策略，在package.json中用bowerlist做了统一标识。

> 更多打包细节直接在build下的分环境webpack配置中注释了


## bug

1. babel全局报错

babel中配置该插件在开发环境会报错。
```
  "plugins": [
    "external-helpers"
  ],
```
可以查看该[issure](https://github.com/storybooks/storybook/issues/1320)了解详情。


## 项目结构
```
├── build                   // webpack配置文件
├── dist                    // 打包后文件
├── src                     // 开发内容
│    ├── assets             // 静态文件
│    ├── components         // Pure Components
│    ├── containers         // Impure Components
│    ├── pages              // 具体页面
│    ├── redux              // redux相关
│    ├── styles             // 单独的css文件
│    ├── App.js             // react初始render
│    └── index.js           // webpack入口
├── static                  // 打包后直接复制的静态资源
├── index.html              // webpack模版
├── .babelrc                // babel配置
├── .postcssrc.js           // postcss配置
├── webpack.config.js       // webpack启动
├── package.json            // 依赖与npm script
├── yarn.lock               // yarn相关
```
> ### PureComponent
>
> react 内置的一个组件创建方法。除了提供了一个具有浅比较的shouldComponentUpdate方法，PureComponent和Component基本上完全相同。当props或者state改变时，PureComponent将对props和state进行浅比较。另一方面，Component不会比较当前和下个状态的props和state。因此，每当shouldComponentUpdate被调用时，组件默认的会重新渲染。

## PureComponent 对比 Component

当props或者state改变的时候，会执行shouldComponentUpdate方法来判断是否需要重新render组建，我们平时在做页面的性能优化的时候，往往也是通过这一步来判断的。Component默认的shouldComponentUpdate返回的是true。

也就是一旦改变则触发render这是十分消耗性能的