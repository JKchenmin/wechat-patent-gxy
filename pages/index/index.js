//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    imgUrls: [
      "./img/1.jpeg",
      "./img/2.jpeg"
    ]
  },
  toHomePage() {
    //登录相关
    wx.login({
      success: function (res) {
        if (res.code) {
          app.globalData.login.code = res.code
          let sessionJson = JSON.parse(JSON.stringify(app.globalData.login))
          // wx.request({
          //   url: 'http://localhost:3030/api/sessionPrepare',
          //   method: 'POST',
          //   data: sessionJson,
          //   dataType: 'json',
          //   success: (res) => {
          //   } 
          // })
          // 获取openId
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              //小程序唯一标识
              appid: 'wx16436f9fa66bd23c',
              //小程序的 app secret
              secret: 'b14885bb6fd57d5e23fd0b7701d05146',
              grant_type: 'authorization_code',
              js_code: res.code
            },
            method: 'GET',
            header: { 'content-type': 'application/json' },
            success: function (openIdRes) {
              console.info("登录成功返回的openId：" + openIdRes.data.openid);
              app.globalData.openId = openIdRes.data.openid;
              // 判断openId是否获取成功
              if (openIdRes.data.openid != null & openIdRes.data.openid != undefined) {
                // 有一点需要注意 询问用户 是否授权 那提示 是这API发出的
                //微信登录到前台
                wx.getSetting({
                  success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                      wx.getUserInfo({
                        success: function (res) {
                          app.globalData.userInfo = res.userInfo;
                          //微信登录到后台
                          let loginData = {
                            userInfo: app.globalData.userInfo
                          }
                          let loginJson = JSON.parse(JSON.stringify(loginData))
                          wx.request({
                            url: 'http://localhost:3030/api/login',
                            data: loginJson,
                            method: 'POST',
                            dataType: 'json',
                            success: (res) => {
                              console.info(res.data)
                            },
                            fail: res => {
                              console.log(res);
                            }
                          })
                        },
                        fail: function (failData) {
                          console.info("用户拒绝授权");
                        }
                      })
                    }
                  }
                })
              } else {
                console.info("获取用户openId失败");
              }
            },
            fail: function (error) {
              console.info("获取用户openId失败");
              console.info(error);
            }
          })
        }
      }
    })
    wx.switchTab({
      url: '../board/board'
    })
  }
})