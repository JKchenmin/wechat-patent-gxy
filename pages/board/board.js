// 获取全局应用程序实例对象
const app = getApp()
const Zan = require('../../dist/zanui/index')
// 创建页面实例对象

Page(Object.assign({}, Zan.Field, {
  /**
   * 页面的初始数据
   */
  data: {
    value: 'Hello world!',
    boards: [{
      swiperBg: [
        './img/board_bg1.png',
        './img/board_bg2.png',
        'http://photos.breadtrip.com/photo_2017_10_22_7bad8c858a80e8f543668d33aec92e7a.jpg?imageView/2/w/960/q/85'
      ]
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('my-info: board load')
  },
  handleZanFieldChange (e) {
    console.log(e)
  },
  to_search () {
    wx.navigateTo({
      url: '../search/search',
    })
  }
}))
