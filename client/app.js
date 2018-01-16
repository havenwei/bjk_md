//app.js
const wechat = require('./utils/wechat.js')
const Q = require('./utils/Q.js')

var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var app = getApp()

App({
    globalData: {
        medical_records: null
    },

    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})
