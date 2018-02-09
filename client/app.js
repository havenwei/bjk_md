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
    // console.log(this.globalData.logged);
    // console.log(this.globalData.userInfo);
		// if (this.globalData.logged && this.globalData.userInfo) return

		util.showBusy('正在登录')
		var that = this

    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess("登录成功1");
          console.log(result);
          that.globalData.userInfo = result;
          that.globalData.logged = true;
          that.unionIdForUserId();
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess("登录成功2");
              that.globalData.userInfo = result.data.data;
              that.globalData.logged = true;
              that.unionIdForUserId();
            },
            fail(error) {
              util.showModel("请求失败", error);
              console.log("request fail", error);
            }
          });
        }
      },

      fail(error) {
        util.showModel("登录失败", error);
        console.log("登录失败", error);
      }
    });
	},
  unionIdForUserId: function() {
    console.log("unionIdForUserId .....");
    var that = this;
    // console.log(that.globalData.userInfo);
    // console.log(that.globalData);

    var unionId = undefined;
    if(that.globalData.userInfo){
      unionId = that.globalData.userInfo.unionId;
    };

    if(unionId !== undefined && that.globalData.userId == undefined){
      wx.request({
        url: `${config.service.host}/weapp/exchangeUnionIdForUserId/${unionId}`,
        success(result) {
          util.showSuccess("获取用户Id成功");
          console.log(result);
          console.log("xxxxx");
          console.log(result.data);
          console.log(result.data.data.userId);
          wx.setStorageSync("userId", result.data.data.userId);
          that.globalData.userId = wx.getStorageSync("userId");
        },
        fail(error) {
          util.showModel("请求失败", error);
          console.log("request fail", error);
        }
      });
    }
  },
	onLaunch: function() {
		qcloud.setLoginUrl(config.service.loginUrl)
    this.login()
	}
})
