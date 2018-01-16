// pages/mr/show.js
var app = getApp()

Page({
  data:{
    tabs: ["病例内容", "体格检查信息", "诊断意见"],
    activeIndex: "0",
    info:{
      id: null,
      create_date: null,
      write_date: null,
      weight: null,
      laboratory_and_supplementary_examinations: null,
      updated_at:null,
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
      created_at:null,
      treatment_recommendation: null,
      oxygen_saturation: null
    }
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    //   id: options.id
    // })
    // var that = this
    console.log(options)
    var medical_record = app.globalData.medical_records[options.id]
    console.log(medical_record)
    this.setData({
      info: medical_record
    })
  },

  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
