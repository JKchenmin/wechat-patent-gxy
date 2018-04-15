// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      {
        swiperBg:[
          './img/board_bg1.png',
          './img/board_bg2.png',
          './img/board_bg3.png'
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    
  },
})
