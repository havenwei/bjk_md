//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp()

Page({
	data: {
		userInfo: {},
		logged: false,
		takeSession: false,
		requestResult: '',
		imgArr: []
	},

	onReady: function() {
		// app.login()
		console.log(app.globalData)
	},
	onLoad: function() {
		this.setData({userInfo: app.globalData.userInfo, logged: app.globalData.logged})
	},
  onShow: function() {
    console.log(app.globalData)
    this.setData({userInfo: app.globalData.userInfo, logged: app.globalData.logged})
  },

	// 用户登录示例
	login: function() {
		if (this.data.logged){
			return;
    }

		util.showBusy('正在登录')
		var that = this

		// 调用登录接口
		qcloud.login({
			success(result) {
				if (result) {
					util.showSuccess('登录成功')
					that.setData({userInfo: result, logged: true})
					app.globalData.userInfo = result
					app.globalData.logged = true
				} else {
					// 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
					qcloud.request({
						url: config.service.requestUrl,
						login: true,
						success(result) {
							util.showSuccess('登录成功')
							that.setData({
                userInfo: result.data.data,
                logged: true
              });
							app.globalData.userInfo = result.data.data
							app.globalData.logged = true
						},
						fail(error) {
							util.showModel('请求失败', error)
							console.log('request fail', error)
						}
					})
				}
			},

			fail(error) {
				util.showModel('登录失败', error)
				console.log('登录失败', error)
			}
		})
	}
})
