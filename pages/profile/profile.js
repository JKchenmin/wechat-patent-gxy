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

  getUserInfo() {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    app.wechat.login()
      .then(res => {
        if (res.code) {
          console.log('登录成功！' + res.code)
          app.wechat.getUserInfo()
            .then(res =>{
              this.setData({ userInfo: res.userInfo });
            }
          )
        } else {
          console.error('获取用户登录态失败！' + res.errMsg)
        }
      })
  }
})
