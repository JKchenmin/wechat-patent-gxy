var app = getApp()
Page({
  data: {
    page: 1,
    swiper: [],
    grid: [],
    is_load: false,
    doc_class_list: []
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    this.get_data()
  },
  get_data() {
    this.setData({
      is_load: true
    })
    wx.request({
      url: "http://localhost:3000/db",
      data: {
        page: this.data.page
      },
      success: (res) => {
        this.setData({
          swiper: res.data.swiper,
          grid: res.data.grid,
          doc_class_list: res.data.doc
        })

        wx.stopPullDownRefresh()
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
})