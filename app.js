//app.js
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
var qqmapsdk;
App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  globalData: {
    name: '人工智能 AI',
    version: '1.1.0',
    currentCity: '北京',
    login:{},
    header: {
      Cookie: '',
      SessionId: ''
    },
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: 'Default',
      avatarUrl: './img/avator.jpg'
    }
  },
  /**
   * WeChat API
   */
  wechat: wechat,
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  
  onLaunch: function () {
    
    let self = this;
    /**
     * 获取位置信息
     */
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      //自己申请的key
      key: 'BYCBZ-PWMHS-PRBOA-6MTOP-XZRAF-5JBLY'
    });
    // 调用微信api获取经纬度
    wechat.getLocation().then(res => {
      const { latitude, longitude } = res
      console.log("你的经度:" + latitude + "\t你的纬度:" + longitude);
      qqmapsdk.reverseGeocoder({
        location: { latitude, longitude },
        success: res => {
          //把位置信息存到globalDara里面
          self.globalData.client = res.result;
          //把dialogid存到globalDara里面
          self.globalData.client.dialogId = (new Date()).getTime();
        },
        fail: res => {
          console.log(res);
        }
      })
    })
    //清空服务器已有账号
    wx.request({
      url: 'http://localhost:3030/api/logout',
      method: 'POST'
    })
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function () {
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  /**
    前台、后台定义： 当用户点击左上角关闭，或者按了设备 Home 键离开微信，小程序并没有直接销毁，而是进入了后台；当再次进入微信或再次打开小程序，又会从后台进入前台。需要注意的是：只有当小程序进入后台一定时间，或者系统资源占用过高，才会被真正的销毁。
    关闭小程序（基础库版本1.1.0开始支持）： 当用户从扫一扫、转发等入口(场景值为1007, 1008, 1011, 1025)进入小程序，且没有置顶小程序的情况下退出，小程序会被销毁。
   */
  onHide: function () {
  }
})

