(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{7:function(e,t,n){"use strict";n.r(t);var r=n(0),l=n.n(r),a=n(6),o=n.n(a),c=n(5),u=n.n(c)()({loader:function(){return n.e(0).then(n.bind(null,21))},loading:function(e){switch(!0){case e.error:return l.a.createElement("div",null,"Error! ",l.a.createElement("button",{onClick:e.retry},"Retry"));case e.timedOut:return l.a.createElement("div",null,"Taking a long time... ",l.a.createElement("button",{onClick:e.retry},"Retry"));case e.pastDelay:return l.a.createElement("div",null," Loading");default:return null}},delay:300,timeout:1e4}),i=function(e){function t(){var e,n,r,l;babelHelpers.classCallCheck(this,t);for(var a=arguments.length,o=Array(a),c=0;c<a;c++)o[c]=arguments[c];return n=r=babelHelpers.possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(o))),r.state={getnow:!1},r.change=function(){r.setState({getnow:!0})},l=n,babelHelpers.possibleConstructorReturn(r,l)}return babelHelpers.inherits(t,e),babelHelpers.createClass(t,[{key:"render",value:function(){var e=this,t=this.state.getnow;return l.a.createElement("div",null,l.a.createElement("h1",null," Hello word1!"),l.a.createElement("button",{onClick:function(){return e.change()}},"出现吧"),t?l.a.createElement(u,null):l.a.createElement("div",null,"none"))}}]),t}(r.Component);o.a.render(l.a.createElement(i,null),document.getElementById("root"))}},[[7,1,2]]]);
//# sourceMappingURL=main.d95ac60dc38812aa6987.js.map