// pages/mr/new.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    files: [],
    tabs: ["病历内容", "检查结果", "用药治疗"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    imgArr1: [],
    imgArr2: [],
    imgArr3: [],
    medical_record_images_attributes: [],
    temperatures: util.xah_range(35, 42, 0.1),
    heights: util.xah_range(10, 240, 1),
    weights: util.xah_range(1, 200, 1),
    bmis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    respiratory_rates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    blood_pressures: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    oxygen_saturations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    pain_scores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    info: {
      identity_card: "",
      index: 0,
      bmi: 0,
      temperature: 0,
      weight: 1,
      height: 10,
      pulse: 0,
      respiratory_rate: 0,
      systolic_pressure: 0,
      diastolic_pressure: 0,
      oxygen_saturation: 0,
      pain_score: 0,
      date: "2016-09-01",
      time: "00:00"
    }
  },
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft:
            (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
        });
      }
    });
  },
  // 上传图片接口
  doUpload1: function() {
    var that = this;
    // this.uploadAndAppend(that.data.imgArr1);
    this.uploadAndAppend(function(res) {
      that.data.imgArr1.push({ data: res.data.imgUrl, category: "病史" });
      that.setData({ imgArr1: that.data.imgArr1 });
    });
  },

  doUpload2: function() {
    var that = this;
    this.uploadAndAppend(function(res) {
      that.data.imgArr2.push({ data: res.data.imgUrl, category: "检查" });
      that.setData({ imgArr2: that.data.imgArr2 });
    });
  },

  doUpload3: function() {
    var that = this;
    this.uploadAndAppend(function(res) {
      that.data.imgArr3.push({ data: res.data.imgUrl, category: "诊断" });
      that.setData({ imgArr3: that.data.imgArr3 });
    });
  },

  //上传图片
  uploadAndAppend: function(callback) {
    var that = this;
    console.log(that.data);

    // 选择图片
    wx.chooseImage({
      count: 5,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        console.log(res);
        var filePaths = res.tempFilePaths;

        for (var i = 0; i < filePaths.length; i++){
          // util.showBusy("正在上传");
          var filePath = filePaths[i];
          // 上传图片
          wx.uploadFile({
            url: config.service.uploadUrl,
            filePath: filePath,
            name: "file",
            success: function (res) {
              util.showSuccess("上传图片成功");
              console.log(res);
              res = JSON.parse(res.data);
              console.log(res);
              callback(res);
            },
            fail: function (e) {
              util.showModel("上传图片失败");
            }
          });
        }
      },
      fail: function(e) {
        console.error(e);
      }
    });
  },

  // 预览图片
  previewImg1: function(e) {
    console.log(e.target.dataset);
    wx.previewImage({
      current: e.target.dataset.imgurl,
      urls: this.data.imgArr1.map(x=>x.data)
    });
  },

  previewImg2: function(e) {
    console.log(e.target.dataset);
    wx.previewImage({
      current: e.target.dataset.imgurl,
      urls: this.data.imgArr2.map(x => x.data)
    });
  },

  previewImg3: function(e) {
    console.log(e.target.dataset);
    wx.previewImage({
      current: e.target.dataset.imgurl,
      urls: this.data.imgArr3.map(x => x.data)
    });
  },

  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onLoad: function() {
  },
  onShow: function() {
    console.log(wx.getStorageSync("userInfo"))
  },
  onReady: function () {
    console.log("on Ready")
    // 页面渲染完成
    this.setData({
      index: 0
    });
    console.log("wx.getStorageSync('userId') ", wx.getStorageSync('userId'))
  },
  onHide: function() {
  },
  onUnload: function() {
  },
  formSubmit: function(e) {
    console.log(wx.getStorageSync("userInfo"))
    console.log(e.detail.value);
    var that = this;
    var regex = /^\d{17}x|\d{18}$/i
    var identity_card = this.data.info.identity_card

    console.log("identity_card is " + identity_card)

    if (!(identity_card.length == 18 && regex.test(identity_card))) {
      util.showModel("身份证号码格式错误", "身份证号码格式错误")
      return false
    }

    // return false

    console.log("wx.getStorageSync('userId') is ", wx.getStorageSync('userId'))

    // var formData = util.params(e.detail.value);
    var formData = e.detail.value;
    console.log(formData);
    var imgArr1 = that.data.imgArr1;
    var imgArr2 = that.data.imgArr2;
    var imgArr3 = that.data.imgArr3;
    var medical_record_images_attributes = []
    console.log(imgArr1)
    console.log(imgArr2)
    console.log(imgArr3)
    medical_record_images_attributes= imgArr1.concat(imgArr2).concat(imgArr3);
    console.log(medical_record_images_attributes);
    var dataToSubmit = Object.assign({}, formData, { medical_record_images_attributes: medical_record_images_attributes, user_id: parseInt(wx.getStorageSync('userId'))});
    // var dataToSubmit = {
    //   formData: formData,
    //   medical_record_images_attributes: medical_record_images_attributes
    // }
    console.log(dataToSubmit)
    wx.request({
      url: `${config.service.host}/weapp/medical_records`,
      data: dataToSubmit,
      method: "POST",
      success: function(res) {
        console.log(res);
        console.log(res.data);
        if (res.statusCode == 200) {
          wx.redirectTo({
            url: "../mr/index"
          });
        }
      }
    });
  },
  formReset: function() {
    console.log("form发生了reset事件");
  },
  bindPickerChangeHeight: function(e) {
    console.log(e.detail.value)
    var index = e.detail.value
    this.setData({
      "info.height": this.data.heights[index]
    });
    console.log(this.data);
  },
  bindPickerChangeWeight: function(e) {
    console.log(e.detail.value)
    var index = e.detail.value    
    this.setData({
      "info.weight": this.data.weights[index]
    });
    console.log(this.data);
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    });
  },
  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    });
  },
  validateIdentityCard: function(e){
    var str = e.detail.value;
    this.setData({
      "info.identity_card": str
    });
    // var str = "42112419871228003111"
    var regex = /^\d{17}x|\d{18}$/i
    if (!(str.length == 18 && regex.test(str))){
      util.showModel("身份证号码格式错误", "身份证号码格式错误")
    }
  },
  bindSliderChangeBMI: function(e) {
    console.log(e.detail.value);
    var index = e.detail.value   
    this.setData({
      "info.bmi": e.detail.value
    });
  },
  bindPickerChangeTemperature: function(e) {
    console.log(e.detail.value);
    var index = e.detail.value 
    this.setData({
      "info.temperature": this.data.temperatures[index]
    });
  },
  bindSliderChangePulse: function(e) {
    this.setData({
      "info.pulse": e.detail.value
    });
  },
  bindSliderChangeRespiratoryRate: function(e) {
    this.setData({
      "info.respiratory_rate": e.detail.value
    });
  },
  bindSliderChangeSystolicPressure: function(e) {
    this.setData({
      "info.systolic_pressure": e.detail.value
    });
  },
  bindSliderChangeDiastolicPressure: function(e) {
    this.setData({
      "info.diastolic_pressure": e.detail.value
    });
  },
  bindSliderChangeOxygenSaturation: function(e) {
    this.setData({
      "info.oxygen_saturation": e.detail.value
    });
  },
  bindSliderChangePainScore: function(e) {
    this.setData({
      "info.pain_score": e.detail.value
    });
  }
});
