// 获取全局应用程序实例对象
const app = getApp()
const Zan = require('../../dist/zanui/index')
const util = require('../../utils/util.js')
let col1H = 0; 
let col2H = 0;
// 创建页面实例对象

Page(Object.assign({}, Zan.Field, {
  /**
   * 页面的初始数据
   */
  data: {
    winWidth: '',
    winHeight: '',
    colW: '',
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: [],
    boards: [{
      swiperBg: [
        './img/board_bg1.png',
        './img/board_bg2.png',
        './img/board_bg1.png'
      ]
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('my-info: board load')
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
        this.setData({
          scrollH: scrollH, imgWidth: imgWidth
        });
        //加载首组图片
        this.loadImages();
      }
    })
  },
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id; 
    let oImgW = e.detail.width;         //图片原始宽度        
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;       //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images; 
    let imageObj = null; 
    for (let i = 0; i < images.length; i++) {
      let img = images[i]; 
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight; 
    let loadingCount = this.data.loadingCount - 1; 
    let col1 = this.data.col1; 
    let col2 = this.data.col2;        
    //判断当前图片添加到左列还是右列
    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    } let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };
    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    } this.setData(data);
  }, 
  loadImages: function () {
    let images = [
      { pic: "./img/1.jpg", height: 0 },
      { pic: "./img/2.jpg", height: 0 },
      { pic: "./img/4.jpg", height: 0 },
      { pic: "./img/7.jpg", height: 0 },
      { pic: "./img/3.jpg", height: 0 },
      { pic: "./img/5.jpg", height: 0 },
      { pic: "./img/6.jpg", height: 0 },
      { pic: "./img/8.jpg", height: 0 },
      { pic: "./img/9.jpg", height: 0 }
    ]; 
    let baseId = "img-" + (+new Date()); 
    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    } 
    this.setData({
      loadingCount: images.length,
      images: images
    });
  },
  to_search() {
    wx.navigateTo({
      url: '../search/search',
    })
  },

}))


// let self = this;
// let imgLen = 0;
// let imgArr = [
//   {
//     imgUrl: './img/6.jpg',
//     title: '',
//     content: ''
//   },
//   {
//     imgUrl: './img/2.jpg',
//     title: '',
//     content: ''
//   },
//   {
//     imgUrl: './img/3.jpg',
//     title: '',
//     content: ''
//   },
//   {
//     imgUrl: './img/3.jpg',
//     title: '',
//     content: ''
//   },
//   {
//     imgUrl: './img/5.jpg',
//     title: '',
//     content: ''
//   }
// ]
// let heightArr = [];
// //1.1 把前三个加入col_1 col_2 col_3
// // console.log(this.data.col_1.push);
// // this.data.col_1.push(imgArr[0]);
// let arr_1 = [];
// let arr_2 = [];
// let arr_3 = [];
// arr_1.push(imgArr[0]);
// arr_2.push(imgArr[1]);
// arr_3.push(imgArr[2]);
// this.setData({
//   col_1: arr_1,
//   col_2: arr_2,
//   col_3: arr_3
// });