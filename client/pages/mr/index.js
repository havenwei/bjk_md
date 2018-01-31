// pages/mr/index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util')
var app = getApp()

Page({
  data:{
    medical_records: null
  },
  onLoad:function(options){
    var that = this;
    wx.request({
        url: config.service.host + "/weapp/medical_records",
        method: 'GET',
        success: function(res) {
          console.log(res.statusCode)
          console.log(res.data)
          var medical_records = res.data.data.medical_records;
          console.log(medical_records)
          medical_records.map( (element, index) => {
            element.created_at = util.formatTime(new Date(element.created_at))
          })
          that.setData({
            medical_records: medical_records
          })
          app.globalData.medical_records = medical_records
          console.log(app.globalData)
        }
    })
  },

  onReady:function(){
    console.log(app.globalData);
  },
  onShow:function(){
  },
  onHide:function(){
  },
  onUnload:function(){
  }
})
