// pages/mr/show.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp()

Page({
  data: {
    tabs: ["病历内容", "检查结果", "用药治疗"],
    activeIndex: "0",
    imgArr1: [],
    imgArr2: [],
    imgArr3: [],
    info: {
    }
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    wx.request({
      url: `${config.service.localhost}/weapp/medical_records/${options.id}`,
      method: "GET",
      success: function(res) {
        console.log(res.statusCode);
        console.log(res.data);
        var medical_record = res.data.data.medical_record;
        console.log(medical_record);
        console.log(medical_record.medical_record_images_categoryA);
        that.setData({
          imgArr1: medical_record.medical_record_images_categoryA,
          imgArr2: medical_record.medical_record_images_categoryB,
          imgArr3: medical_record.medical_record_images_categoryC
        });
        console.log(that.data.imgArr1);
        that.setData({
          info: medical_record
        });
      }
    });
  },

  // 预览图片
  previewImg1: function(e) {
    console.log(e.target.dataset);
    console.log(e.target.dataset.imgUrl);
    console.log(this.data.imgArr);
    wx.previewImage({
      urls: this.data.imgArr1.map(x => x.data)
    });
  },

  previewImg2: function(e) {
    console.log(e.target.dataset);
    console.log(e.target.dataset.imgUrl);
    console.log(this.data.imgArr);
    wx.previewImage({
      current: e.target.dataset.imgUrl,
      urls: this.data.imgArr2
    });
  },

  previewImg3: function(e) {
    console.log(e.target.dataset);
    wx.previewImage({
      current: e.target.dataset.imgUrl,
      urls: this.data.imgArr3
    });
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  goToEditPage: function(e) {
    console.log(e);

    var id = this.data.info.id;
    console.log(id);
    var url = "../mr/edit?id=" + id;
    console.log(url);
    wx.redirectTo({ url: url });
  }
});
