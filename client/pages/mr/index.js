// pages/mr/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')
var app = getApp()

Page({
  data:{
    medical_records: null
  },

  onLoad: function(options){
    console.log(this.data.medical_records)
    console.log(this.data.medical_records == null)
    if (getApp().globalData.userId == undefined){
      util.showModel("请先登录", "请先授权登陆!");
    }
    
    if (wx.getStorageSync('userId') == "") {
      util.showLoading("加载中......");
    }

    var that = this;
    wx.request({
      url: `${config.service.host}/weapp/medical_records?user_id=${wx.getStorageSync('userId')}`,
      method: "GET",
      success: function(res) {
        console.log(res);
        console.log(res.statusCode);
        console.log(res.data);

        var medical_records = res.data.data.medical_records || [];
        console.log(medical_records);
        if (medical_records.length > 0) {
          util.showSuccess("加载成功! ");
          medical_records.map((element, index) => {
            element.created_at = util.formatTime(
              new Date(element.created_at)
            );
          });
        }
        that.setData({ medical_records: medical_records });
        app.globalData.medical_records = medical_records;
        console.log(app.globalData);
      }
    });
  },

  onShow: function () {
    console.log("on Show wx.getStorageSync('userId') ", wx.getStorageSync('userId'))
  },

  onReady:function(){
    console.log("on Ready wx.getStorageSync('userId') ", wx.getStorageSync('userId'))
    console.log(app.globalData);
      console.log(wx.getStorageSync('unionId'))
      console.log(wx.getStorageSync('userId'))
      console.log(wx.getStorageSync('userInfo'))
  },
 
  onHide:function(){
  },

  onUnload:function(){
  }
})
