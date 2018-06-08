// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rest_rpx: 0,
    rest_rpx_half: 0,
    boards: [{
      swiperBg: [
        './img/board_bg1.jpg',
        './img/board_bg2.png',
        './img/board_bg3.png'
      ]
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    let self = this;
    wx.getSystemInfo({
      success: (res) => {
        let ww_px = res.windowWidth
        let wh_px = res.windowHeight
        let n = 750 / ww_px
        let rest_height_rpx = wh_px * n - 150 * n - 120
        let rest_rpx = rest_height_rpx - 5
        let rest_rpx_half = rest_rpx / 2
        self.setData({
          rest_rpx: rest_rpx,
          rest_rpx_half: rest_rpx_half
        })
      }
    })
  },
  to_demand_hall(){
    wx.navigateTo({
      url: '../demand-hall/demand-hall',
    })
  },
  to_product_hall() {
    wx.navigateTo({
      url: '../product-hall/product-hall',
    })
  },
  to_search() {
    wx.navigateTo({
      url: '../search/search',
    })
  },
})
