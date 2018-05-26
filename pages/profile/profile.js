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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let self = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              self.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  
  // 机器人聊天
  contact(){
    wx.navigateTo({
      url: '../contact/contact',
    })
  }
})
