// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      wechat: 'WEDN-NET',
      nickName: 'Default',
      avatarUrl: './img/avator.jpg'
    }
  },
  onLoad(){
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  // 机器人聊天
  contact() {
    wx.navigateTo({
      url: './contact/contact',
    })
  },
  setting(){
    wx.navigateTo({
      url: './setting/setting',
    })
  },
  notice() {
    wx.navigateTo({
      url: './notice/notice',
    })
  }
})
