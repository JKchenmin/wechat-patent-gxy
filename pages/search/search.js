// 引入自定义的一个数据格式 ArrayList
let ArrayList = require("./../../utils/arrayList.js")
const wechat = require('./../../utils/wechat.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    doc_list: {},
    data: {},
    search_tip: {},
    rich: wx.canIUse('rich-text'),
    is_search: false,
    key: null,
    is_load: false,
    more: false,
    no_more: false,
    page: 1,
    hot_tag: {},
    my_search: {},
    my_search_arr: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取搜索记录 
    let my_search = '';
    //调用api
    if (typeof wx.getStorageSync("my_search") == 'object') {
      my_search = wx.getStorageSync("my_search");
    }
    //如果为空
    if (my_search == '') {
      my_search = { arr: [] };
    }
    let list = new ArrayList(my_search.arr);
    this.setData({
      my_search: list,
      my_search_arr: list.toArray()
    })

    //请求后台数据
    wechat.request("http://localhost:3030/api/getSearchHistory")
      .then(res => this.setData({ hot_tag: res.data }), err => console.log(err))
  },
  // blurinput(event){
  //   //完成双向数据绑定
  //   this.data.key = event.detail.value;
  //   console.log(this.data.key);
  // },

  get_data() {
    this.setData({
      is_load: true
    })
    //请求后台数据
    wx.request({
      url: "https://cloud-doc.leyix.com/api/v2/search",
      data: {
        key: this.data.key,
        page: this.data.page
      },
      success: (res) => {
        if (this.data.page <= 1) {
          this.setData({
            doc_list: res.data.doc,
            data: res.data.result,
            is_search: true
          })
        } else {
          let o_data = this.data.data;
          for (var index in res.data.result.items) {
            o_data.items.push(res.data.result.items[index])
          }
          this.setData({
            data: o_data
          })
        }
        //判断是否还有下一页
        let all_page = Math.ceil(res.data.result.total / res.data.rows)
        if (this.data.page == all_page) {
          this.setData({
            more: false,
            no_more: true
          })
        } else if (all_page > this.data.page) {
          this.setData({
            more: true,
            no_more: false
          })
        }

        let key = this.data.key

        //更新搜索记录
        if (this.data.my_search.contains(key)) {//如果存在就先删除
          this.data.my_search.remove(key)
        }
        this.data.my_search.add(key)
        //存入storage
        wx.setStorageSync("my_search", this.data.my_search)
        this.data.my_search = wx.getStorageSync("my_search");
        wx.hideLoading();
        this.setData({
          is_load: false
        })
      },
      complete: () => {
        wx.hideLoading();
        this.setData({
          is_load: false
        })
      }
    })
  },
  clear_my_search(event) {
    let key = event.currentTarget.dataset.name;
    //更新搜索记录
    if (this.data.my_search.contains(key)) {//如果存在就先删除
      this.data.my_search.remove(key)
    }
    wx.setStorageSync("my_search", this.data.my_search)
    this.setData({
      my_search_arr: this.data.my_search.toArray()
    })
  },
  search(e) {
    let key = e.detail.value;
    if (key == '') {
      return false;
    }
    this.setData({
      key: key,
      page: 1,
      is_load: false,
      more: false,
      no_more: false
    })
    wx.showLoading({
      title: '搜索中',
    })
    console.log(this.data)
    this.get_data()
  },
  search_tip(e) {
    let key = e.detail.value;
    if (key == '') {
      this.setData({
        search_tip: {}
      })
      return false;
    }
    //请求后台数据
    wx.request({
      url: "https://cloud-doc.leyix.com/api/v2/title-tip",
      data: {
        key: key
      },
      success: (res) => {
        this.setData({
          search_tip: res.data
        })
      }
    })
  },
  cancel() {
    this.setData({
      doc_list: {},
      data: {},
      search_tip: {},
      is_search: false,
      key: null,
      is_load: false,
      more: false,
      no_more: false,
      page: 1,
    })
    wx.navigateTo({
      url: '../board/board',
    })
  },
  go_info: function (event) {
    let id = event.currentTarget.dataset.id;
    console.log(id)

    wx.navigateTo({
      url: '../doc-info/doc-info?doc_id=' + id
    })
  },
  go_page: function (event) {
    let page_id = event.currentTarget.dataset.id;
    console.log(page_id)
    wx.navigateTo({
      url: '../doc-page/doc-page?page_id=' + page_id
    })
  },
  tag_search(event) {
    let name = event.currentTarget.dataset.name;
    this.setData({
      key: name
    })
    wx.showLoading({
      title: '搜索中',
    })
    this.get_data()
  }
})