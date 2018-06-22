import React, {
  Component
} from 'react'
import Loadable from 'react-loadable';

// 为了使用按需加载需要为babel添加插件
// babel-plugin-syntax-dynamic-import
const LoadableTest = Loadable({
  loader: () => 
    import ( /* webpackChunkName: "LoadableTe" */ './components/test.jsx'),
  loading(props) {
    switch (true) {
      case props.error: return <div>Error! <button onClick={ props.retry }>Retry</button></div>;
      case props.timedOut: return <div>Taking a long time... <button onClick={ props.retry }>Retry</button></div>;
      case props.pastDelay: return <div> Loading</div>
      default: return null;
    }
  },
  delay: 300, // 低于.3s就不显示loading
  timeout: 10000  // 10s 超时
}) 

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     getnow: false
  //   }
  // }
  state = {
    getnow: false
  }

  // 箭头函数取消bind的语法需要babel-stage-0来支持
  change = () => {
    console.log('测试删除');
    this.setState({ getnow: true})
  }

  render() {
    let { getnow } = this.state
    return (
      <div>
        <h1> Hello word1!</h1>
        <button onClick= {() => this.change()}>出现吧</button>
        {
          getnow
            ? < LoadableTest />
            : <div>none</div>
        }
      </div>
    )
  }
}
