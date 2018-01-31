//app.js
const wechat = require('./utils/wechat.js')
const Q = require('./utils/Q.js')
var util = require('./utils/util.js')

var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')
var app = getApp()

App({

	globalData: {
		userInfo: {},
		logged: false,
		medical_records: null
	},

	// 用户登录示例
	login: function() {
		if (this.globalData.logged) return

		util.showBusy('正在登录')
		var that = this

		// 调用登录接口
		qcloud.login({
			success(result) {
				if (result) {
					util.showSuccess('登录成功')
					that.globalData.userInfo = result
					that.globalData.logged = true
				} else {
					// 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
					qcloud.request({
						url: config.service.requestUrl,
						login: true,
						success(result) {
							util.showSuccess('登录成功')
							that.globalData.userInfo = result.data.data
							that.globalData.logged = true
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
	},

	onLaunch: function() {
		qcloud.setLoginUrl(config.service.loginUrl)
		this.login()
	}
})
