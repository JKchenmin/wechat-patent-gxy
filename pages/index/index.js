//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    imgUrls: [
      "./img/1.jpeg",
      "./img/2.jpeg",
      "./img/3.jpeg"
    ]
  },
  toHomePage: function(){
    wx.switchTab({
      url: '../board/board'
    })
  }

})