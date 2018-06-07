let ArrayList = require("../../utils/arrayList.js");
Page({
  data: {
    doc_id: 0,
    doc: {},
    my_doc: [],
    is_add: true,
    show_page: false,
    data: {},
    page: 1,
    class_id: 0
  },
  onLoad: function (option) {

    let old_my_doc = wx.getStorageSync("old_my_doc");
    if (old_my_doc == '') {
      old_my_doc = { arr: [] };
    }
    let list = new ArrayList(old_my_doc.arr);
    list.setType("number")
    let id = option.doc_id
    this.setData({
      doc_id: id,
      my_doc: list
    })
    wx.showLoading({
      title: '加载中',
    })
    this.get_data()
  },
  get_data() {
    wx.request({
      url: "https://cloud-doc.leyix.com/api/v3/doc-info-2",
      data: {
        doc_id: this.data.doc_id,
        page: this.data.page
      },
      success: (res) => {
        if (res.data.current_page == 1) {
          this.setData({
            doc: res.data.doc,
            data: res.data,
            show_page: true
          })
          if (!res.data.doc.is_follow) {
            this.setData({
              is_add: false,
              add_text: "加入档库"
            })
          }
          wx.setNavigationBarTitle({
            title: res.data.doc.title
          })
        } else {
          let o_data = this.data.data;
          for (var index in res.data.data) {
            o_data.data.push(res.data.data[index])
          }
          this.setData({
            data: o_data
          })
        }
        wx.stopPullDownRefresh()
      }, complete: () => {
        wx.hideLoading()
      }
    })
  }
})