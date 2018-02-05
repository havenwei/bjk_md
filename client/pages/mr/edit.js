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
      id: null,
      createDate: null,
      writeDate: null,
      weight: null,
      laboratoryAndSupplementaryExaminations: null,
      updatedAt: null,
      pulse: null,
      height: null,
      chiefComplaint: null,
      vaccinationHistory: null,
      reservationId: null,
      personalHistory: null,
      createUid: null,
      familyHistory: null,
      userId: null,
      temperature: null,
      dateOfBirth: null,
      bloodType: null,
      painScore: null,
      writeUid: null,
      bmi: null,
      physicalExamination: null,
      respiratoryRate: null,
      onsetDate: null,
      remarks: null,
      historyOfPresentIllness: null,
      pastMedicalHistory: null,
      allergicHistory: null,
      preliminaryDiagnosis: null,
      name: null,
      identityCard: null,
      imagingExamination: null,
      gender: null,
      createdAt: null,
      treatmentRecommendation: null,
      oxygenSaturation: null
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
        })
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
    console.log(formData);
    wx.request({
      url: config.service.host + "/weapp/medical_records/" + that.data.info.id,
      data: formData,
      method: "PUT",
      success: function(res) {
        console.log(res.statusCode);
        if (res.statusCode == 200) {
          wx.redirectTo({
            url: "../mr/index"
          });
        }
      }
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
