const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

var showLoading = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 2000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
const showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

const params = (obj) => {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
}

const xah_range = ((min, max, step = 1) => {
  // return a array from min to max, inclusive, in steps of step.
  // if step is not integer, then max may not be included
  // http://xahlee.info/js/javascript_range_array.html
  // version 2017-04-20
  const arr = [];
  const totalSteps = Math.floor((max - min) / step);
  for (let ii = 0; ii <= totalSteps; ii++) { arr.push(ii * step + min) }
  return arr;
});


module.exports = { formatTime, showBusy, showSuccess, showLoading, showModel, params, xah_range }
