//app.js
var qqmapsdk;
/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
const wechat = require('./utils/wechat.js')
/**
 * QQ API 模块
 * @type {Object}
 * 用于调用腾讯的地理位置API
 */
const QQMapWX = require('./utils/qqmap-wx-jssdk.js')

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  globalData: {
    name: '人工智能 AI',
    version: '1.1.0',
    currentCity: '北京'
  },
  /**
   * WeChat API
   */
  wechat: wechat,

  onLaunch: function () {
    // 实例化腾讯地图API核心类  
    qqmapsdk = new QQMapWX({
      key: 'BYCBZ-PWMHS-PRBOA-6MTOP-XZRAF-5JBLY'//此处使用你自己申请的key  
    });
    // 调用微信api获取经纬度
    wechat.getLocation().then(res => {
          const { latitude, longitude } = res
          console.log("你的经度:" + latitude + "\t你的纬度:" + longitude);
        
          qqmapsdk.reverseGeocoder({
            location: { latitude, longitude },
            success: res => {
              console.log("你的地理位置:\n" + res.result.address);
            },
            fail: res => {
              console.log(res);
            }

          })
          
        })
  }
})