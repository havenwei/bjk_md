//app.js
// const wechat = require('./utils/wechat.js')
// const Q = require('./utils/Q.js')
var qcloud = require('./vendor/wafer2-client-sdk/index')
var util = require('./utils/util.js')
var config = require('./config')

App({

	globalData: {
		logged: false,
    userId: undefined,
		userInfo: {},
		medical_records: undefined
	},

	// 用户登录示例
	login: function() {
		util.showBusy('正在登录')
		var that = this
    that.getUserInfo();
  },
  
  getUserInfo: function() {
    var that = this;
    qcloud.request({
      url: config.service.requestUrl,
      login: true,
      success(result) {
        console.log("登录成功2\n", result);
        wx.setStorage({
          key: 'logged',
          data: true,
          success: function (res) {
            that.globalData.logged = true;
          }
        });

        wx.setStorage({
          key: 'userInfo',
          data: result.data.data,
          success: function (res) {
            that.globalData.userInfo = result.data.data;
            wx.setStorageSync("unionId", that.globalData.userInfo.unionId)
            that.unionIdForUserId();            
          }
        });

      },
      fail(error) {
        util.showModel("请求失败", error);
        console.log("request fail", error);
      }
    });
  },

  unionIdForUserId: function() {
    console.log("unionIdForUserId .....");
    var that = this;
    wx.getStorage({
      key: 'unionId',
      success: function (res) {
        var unionId = res.data
        wx.request({
          login: true,
          url: `${config.service.host}/weapp/exchangeUnionIdForUserId/${unionId}`,
          success(result) {
            util.showSuccess("获取用户Id成功");
            console.log(result);
            console.log(result.data.data.userId)
            if (result.data.data.userId == ""){
              // 数据库中不存在此微信账号认证的账号，所以获取的userId是空的，需要创建
              that.createUserFromWxApp()
            }else{
              wx.setStorageSync("userId", result.data.data.userId);
              that.globalData.userId = wx.getStorageSync("userId");
            }
          },
          fail(error) {
            util.showModel("请求失败", error);
            console.log("request fail", error);
          }
        });
      }
    })
  },

  createUserFromWxApp: function() {
    var userInfo = wx.getStorageSync("userInfo")
    var dataToSubmit = {
      "nickName": userInfo.nickName,
      "gender": userInfo.gender.to_s,
      "openId": userInfo.openId,
      "avatarUrl": userInfo.avatarUrl,
      "unionId": userInfo.unionId
    }
    wx.request({
      url: `${config.service.host}/weapp/createUserFromWxApp`,
      method: "POST",
      data: dataToSubmit,
      success: function (res) {
        console.log("post to createUserFromWxApp")
        console.log(res);
        console.log(res.data);
      }
    });
  },
  
  onLaunch: function() {
		qcloud.setLoginUrl(config.service.loginUrl)
    this.login()
  },
  
  onShow: function() {
    
  }
})
