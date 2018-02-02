// pages/mr/show.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var app = getApp()

Page({
  data: {
    tabs: ["病历内容", "检查结果", "用药治疗"],
    activeIndex: "0",
    info: {
      id: null,
      create_date: null,
      write_date: null,
      weight: null,
      laboratory_and_supplementary_examinations: null,
      updated_at: null,
      pulse: null,
      height: null,
      blood_pressure: null,
      chief_complaint: null,
      vaccination_history: null,
      reservation_id: null,
      personal_history: null,
      create_uid: null,
      family_history: null,
      user_id: null,
      temperature: null,
      date_of_birth: null,
      blood_type: null,
      pain_score: null,
      write_uid: null,
      bmi: null,
      physical_examination: null,
      respiratory_rate: null,
      onset_date: null,
      remarks: null,
      history_of_present_illness: null,
      past_medical_history: null,
      allergic_history: null,
      preliminary_diagnosis: null,
      name: null,
      identity_card: null,
      imaging_examination: null,
      gender: null,
      created_at: null,
      treatment_recommendation: null,
      oxygen_saturation: null
    }
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    var that = this;
    var that = this;
    wx.request({
      url: `${config.service.host}/weapp/medical_records/${options.id}`,
      method: "GET",
      success: function(res) {
        console.log(res.statusCode);
        console.log(res.data);
        var medical_record = res.data.data.medical_record;
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
  }
});
