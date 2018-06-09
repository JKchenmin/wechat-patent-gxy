// pages/temp.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    path:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 附近的酒店
  onLoad: function (options) {
    let url = options.url
    let u2 = url.replace(/qqqwwweeeaaa/g, "&").replace(/qqqwwweeebbb/g,"=");
    this.setData({
      path: u2
    })
  }
})