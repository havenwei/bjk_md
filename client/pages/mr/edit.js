// pages/mr/edit.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require("../../utils/util.js");
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
      url: `${config.service.host}/weapp/medical_records/${options.id}`,
      method: "GET",
      success: function(res) {
        console.log(res.statusCode);
        console.log(res.data);
        var medical_record = res.data.data.medical_record;
        that.setData({
          imgArr1: medical_record.medical_record_images_categoryA,
          imgArr2: medical_record.medical_record_images_categoryB,
          imgArr3: medical_record.medical_record_images_categoryC
        });
        console.log(medical_record);
        that.setData({
          info: medical_record
        });
        console.log(that.data.info);
      }
    });
  },
  formSubmit: function(e) {
    var that = this;
    // var formData = util.params(e.detail.value);
    var formData = Object.assign({}, e.detail.value, {
      id: that.data.info.id
    });
    var imgArr1 = that.data.imgArr1;
    var imgArr2 = that.data.imgArr2;
    var imgArr3 = that.data.imgArr3;
    var medical_record_images_attributes = [];
    medical_record_images_attributes = imgArr1.concat(imgArr2).concat(imgArr3);
    var dataToSubmit = Object.assign({}, formData, { medical_record_images_attributes: medical_record_images_attributes });
    // var dataToSubmit = { formData: formData, medical_record_images_attributes: medical_record_images_attributes };
    console.log(formData);
    wx.request({
      url: `${config.service.host}/weapp/medical_records/${that.data.info.id}`,
      data: dataToSubmit,
      method: "PUT",
      success: function(res) {
        console.log(res);
        console.log(res.statusCode);
        // if (res.statusCode == 200) {
        //   wx.redirectTo({
        //     url: "../mr/index"
        //   });
        // }
      }
    });
  },
  // 上传图片接口
  doUpload1: function() {
    var that = this;
    // this.uploadAndAppend(that.data.imgArr1);
    this.uploadAndAppend(function(res) {
      that.data.imgArr1.push({
                  data: res.data.imgUrl,
                  category: "病史"
                })
      that.setData({
        imgArr1: that.data.imgArr1
      });
    });
  },

  doUpload2: function() {
    var that = this;
    this.uploadAndAppend(function(res) {
      that.data.imgArr2.push({ data: res.data.imgUrl, category: "检查" });
      that.setData({
        imgArr2: that.data.imgArr2
      });
    });
  },

  doUpload3: function() {
    var that = this;
    this.uploadAndAppend(function(res) {
      that.data.imgArr3.push({
        data: res.data.imgUrl,
        category: "检查"
      });
      that.setData({ imgArr3: that.data.imgArr3 });
    });
  },

  //上传图片
  uploadAndAppend: function(callback) {
    var that = this;
    console.log(that.data);

    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        util.showBusy("正在上传");
        var filePath = res.tempFilePaths[0];

        // 上传图片
        wx.uploadFile({
          url: config.service.uploadUrl,
          filePath: filePath,
          name: "file",

          success: function(res) {
            util.showSuccess("上传图片成功");
            console.log(res);
            res = JSON.parse(res.data);
            console.log(res);
            callback(res);
          },

          fail: function(e) {
            util.showModel("上传图片失败");
          }
        });
      },
      fail: function(e) {
        console.error(e);
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
  bindSliderChangeBMI: function(e) {
    this.setData({ "info.bmi": e.detail.value });
  },
  bindSliderChangeTemperature: function(e) {
    this.setData({ "info.temperature": e.detail.value });
  },
  bindSliderChangePulse: function(e) {
    this.setData({ "info.pulse": e.detail.value });
  },
  bindSliderChangeRespiratoryRate: function(e) {
    this.setData({ "info.respiratoryRate": e.detail.value });
  },
  bindSliderChangeSystolicPressure: function(e) {
    this.setData({ "info.systolicPressure": e.detail.value });
  },
  bindSliderChangeDiastolicPressure: function(e) {
    this.setData({ "info.diastolicPressure": e.detail.value });
  },
  bindSliderChangeOxygenSaturation: function(e) {
    this.setData({ "info.oxygenSaturation": e.detail.value });
  },
  bindSliderChangePainScore: function(e) {
    this.setData({ "info.painScore": e.detail.value });
  }
});
