//app.js
const wechat = require('./utils/wechat.js')
const Q = require('./utils/Q.js')

var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
    }
})
