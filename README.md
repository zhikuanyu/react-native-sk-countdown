# react-native-sk-countdown

##What is it
react-native-sk-countdown is a simple countdown component for React Native, pure js implementation

##How to use it

1. `npm install react-native-sk-countdown@latest --save`

2. Write this in index.ios.js / index.android.js

2.1 Countdown in seconds.

```javascript
'use strict';

var React = require('react-native');
var {CountDownText} = require('react-native-sk-countdown');

var test = React.createClass({
  render: function(){
    return (
      <CountDownText
        ref='countDownText'
        style={{color:'#FFF',fontSize:13,fontWeight:'500'}}
        countType='seconds' // 计时类型：seconds / date
        auto={true} // 自动开始
        afterEnd={() => {}} // 结束回调
        timeLeft={60} // 正向计时 时间起点为0秒
        step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
        startText='获取验证码' // 开始的文本
        endText='获取验证码' // 结束的文本
        intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调
      />
    )
  }
});

```
![](https://raw.githubusercontent.com/shigebeyond/react-native-sk-countdown/master/demo1.gif)

2.1 Countdown in timestamp.

```javascript
'use strict';

var React = require('react-native');
var {CountDownText} = require('react-native-sk-countdown');

var test = React.createClass({
  render: function(){
    return (
      <CountDownText // 倒计时
        ref='countDownText'
        style={{color:'#FFF',fontSize:13,fontWeight:'500'}}}
        countType='date' // 计时类型：seconds / date
        auto={true} // 自动开始
        afterEnd={() => {}} // 结束回调
        timeLeft={this.props.item.time_wait / 1000} // 正向计时 时间起点为0秒
        step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
        startText='' // 开始的文本
        endText='' // 结束的文本
        intervalText={(date, hour, min, sec) => date + '天' + hour + '时' + min + '分' + sec} // 定时的文本回调
      />
    )
  }
});

```
![](https://raw.githubusercontent.com/shigebeyond/react-native-sk-countdown/master/demo2.gif)
