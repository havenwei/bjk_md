// pages/mr/new.js

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
  data: {
        files: [],
        tabs: ["基本信息", "体格检查", "诊断意见"],
        activeIndex: "0",
        sliderOffset: 0,
        sliderLeft: 0,
        heights: [15, 50, 51, 52, 53, 54, 55, 56, 57],
        weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        bmis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        temperatures: [38,39,40,41,42],
        respiratory_rates: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        blood_pressures: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        oxygen_saturations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        pain_scores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        index: 0,
        hSelectedIndex: 0,
        wSelectedIndex: 0,
        bmi: 0,
        temperature: 0,
        pulse: 0,
        respiratory_rate: 0,
        blood_pressure: 0,
        oxygen_saturation: 0,
        pain_score: 0,
        date: "2016-09-01",
        time: "12:01"
    },
    onLoad: function () {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2
                });
            }
        });
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });
    },
    onReady:function(){
    // 页面渲染完成
    this.setData({

        index: 0
    })

    },
    onShow:function(){
    // 页面显示
    },
    onHide:function(){
    // 页面隐藏
    },
    onUnload:function(){
    // 页面关闭
    },
    formSubmit: function(e) {
      var that = this;
      var formData = e.detail.value;
      var web_token = wx.getStorageSync('web_token')
      console.log(formData);
      console.log(web_token);

      wx.request({
          // url: config.host + "/patients/medical_records.json",
          url: config.service.dbHost + "/fa_medical_record",
          data: formData,
          method: 'POST',                  
          success: function(res) {

            console.log(res.statusCode)
            console.log(res.data)
            if (res.statusCode == 200){
              wx.navigateTo({
                url: '../mr/index'
              })
            }
          }
      })
    },
    formReset: function() {
    console.log('form发生了reset事件')
    },
    radioChange: function (e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);

        var checkboxItems = this.data.checkboxItems, values = e.detail.value;
        for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
            checkboxItems[i].checked = false;

            for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
                if(checkboxItems[i].value == values[j]){
                    checkboxItems[i].checked = true;
                    break;
                }
            }
        }
        this.setData({
            checkboxItems: checkboxItems
        });
    },
    bindDateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    bindCountryCodeChange: function(e){
        this.setData({
            countryCodeIndex: e.detail.value
        })
    },
    bindCountryChange: function(e) {
        this.setData({
            countryIndex: e.detail.value
        })
    },
    bindAccountChange: function(e) {
        console.log('picker account 发生选择改变，携带值为', e.detail.value);

        this.setData({
            accountIndex: e.detail.value
        })
    },
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },
    bindPickerHChange: function(e) {
        this.setData({
            hSelectedIndex: e.detail.value
        })
        console.log(this.data)
    },
    bindPickerWChange: function(e) {
        this.setData({
            wSelectedIndex: e.detail.value
        })
        console.log(this.data)
    },
    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                that.setData({
                    files: that.data.files.concat(res.tempFilePaths)
                });
            }
        })
    },
    previewImage: function(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
    },
    bindSliderChangeBMI: function(e){

      console.log(e.detail.value);

      this.setData({
          bmi: e.detail.value
      })
    },
    bindSliderChangeTemperature: function(e){
      this.setData({
          temperature: e.detail.value
      })
    },
    bindSliderChangePulse: function(e){
      this.setData({
          pulse: e.detail.value
      })
    },
    bindSliderChangeRespiratoryRate: function(e){
      this.setData({
          respiratory_rate: e.detail.value
      })
    },
    bindSliderChangeBloodPressure: function(e){
      this.setData({
          blood_pressure: e.detail.value
      })
    },
    bindSliderChangeOxygenSaturation: function(e){
      this.setData({
          oxygen_saturation: e.detail.value
      })
    },
    bindSliderChangePainScore: function(e){
      this.setData({
          pain_score: e.detail.value
      })
    }
})
