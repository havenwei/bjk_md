//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    userInfo: {},
    logged: false,
    avatarBtn: "./user-unlogin.png",
    nickNameBtn: "登录"
  },
  // 用户登录示例
  login: function() {
    var that = this;
    app.login();

    wx.getStorage({
      key: 'logged',
      success: function (res) {
        that.setData({ logged: res.data });
      }
    });

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(that.data)
        that.setData({ userInfo: res.data });
        that.setData({
          "avatarBtn": that.data.userInfo.avatarUrl,
          "nickNameBtn": that.data.userInfo.nickName
        })
      }
    });

    console.log("wx.getStorageSync('userId') ", wx.getStorageSync('userId'))
  },

  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'logged',
      success: function (res) {
        that.setData({ logged: res.data });
      }
    });

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(that.data)
        that.setData({ userInfo: res.data });
        that.setData({
          "avatarBtn": that.data.userInfo.avatarUrl,
          "nickNameBtn": that.data.userInfo.nickName
        })
      }
    });

  },
  onShow: function () {
    // var that = this
    // console.log("on Show wx.getStorageSync('userId') ", wx.getStorageSync('userId'))
    // console.log(app.globalData);
    console.log(wx.getStorageSync("userInfo"))
  },

  onReady: function () {
    console.log(wx.getStorageSync('unionId'))
    console.log(wx.getStorageSync('userId'))
    console.log(wx.getStorageSync('userInfo'))
    // console.log("on Ready wx.getStorageSync('userId') ", wx.getStorageSync('userId'))
    // console.log(app.globalData);
  }
});
