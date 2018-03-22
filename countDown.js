class CountDown {
  constructor(o) {
    this.countType = o.countType; // 支持两种计时方式，一种是在两个日期间计时，一种基于秒数计时
    this.timerId; // 计时器ID
    this.endTime = o.endTime; // 计时器结束时间
    this.startTime = o.startTime; // 计时器开始时间
    this.timeLeft = o.timeLeft; // 计时剩余秒数，区别于上面时间段的计时方式
    this.timePassed = 0; // 正向为累计时间，反向为剩余时间
    this.onInterval = o.onInterval; // 定时的回调
    this.onEnd = o.onEnd, // 结束的回调
    this.step = o.step; // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
    this.counter = 0; // 累加器
  }
  // 设置数据
  setData(o) {
    // 数据校验
    if (!this.countType) {
      // console.log("必须设置计时类型，date为以日期为单位计时，seconds是以秒为单位计时");
      return;
    }

    if (this.timeLeft && (this.endTime || this.startTime)) {
      // console.log("只能设置一种计时参数，要不设置起止日期，要不设置间隔秒数");
      return;
    }

    if (!this.timeLeft && !(this.endTime || this.startTime)) {
      // console.log("必须设置一种计时参数，要不设置起止日期，要不设置间隔秒数");
      return;
    }

    // 开始时间默认为当前时间
    if (!this.timeLeft && typeof (this.startTime) == 'undefined') {
      this.startTime = new Date().getTime() / 1000;
    }

    // 计算剩余的秒数
    if (!this.timeLeft) {
      this.timeLeft = Math.floor(this.seconds(this.endTime) - this.seconds(this.startTime));
    }

    // 刷新数据
    this.refreshTime(true);
  }

  // 获得秒数
  seconds(time) {
    if (typeof (time) == "number" || typeof (time) == 'string' && /^\d+$/.test(time)) { // 数值 or 数字的字符串
      return time;
    }
    return new Date(time).getTime() / 1000;
  }
  // 周期启动刷新时间
  auto() {
    // 开始计时
    var self = this;
    this.timerId = setTimeout(function () {
      if (self.timePassed <= 0 && self.step < 0) { // 倒计时到0停止计时
        self.end();
        return;
      }
      self.refreshTime(true);
    }, 1000 * Math.abs(this.step)); // 时间间隔为正数：对step求绝对值
  }
  // 一位数补零
  ten(t) {
    if (t < 10) {
      t = "0" + t;
    }
    return t;
  }
  // 刷新数据, isStart 是否自动开始
  refreshTime(isStart) {
    var time = 0;
    this.timePassed = (this.timeLeft * 1000 + this.step * 1000 * this.counter++) / 1000;
    if (this.countType == "date") {
      var day = this.ten(Math.floor(this.timePassed / (60 * 60 * 24))),
        hour = this.ten(Math.floor(this.timePassed / (60 * 60)) - day * 24),
        minute = this.ten(Math.floor(this.timePassed / 60) - (day * 24 * 60) - (hour * 60)),
        second = this.ten(Math.floor(this.timePassed) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60));
      this.onInterval(day, hour, minute, second); // 回调
    } else if (this.countType == "seconds") {
      this.onInterval(this.timePassed); // 回调
    }
    if (isStart) // 是否开始计时
      this.auto();
  }
  // 开始：开始计时
  start() {
    clearTimeout(this.timerId);
    this.refreshTime(true);
  }
  // 结束：没有清空计数 + 停止计时
  end() {
    clearTimeout(this.timerId);
    this.onEnd(this.timeLeft);
  }
  // 重置：清空计数 + 停止计时
  reset() {
    this.counter = 0; // 重置计数器
    clearTimeout(this.timerId);
    this.refreshTime(false);
  }
}

let countDownFn = function (o) {
  return new CountDown(o)
}

export default countDownFn