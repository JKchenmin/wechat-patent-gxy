const app = getApp()
const util = require('../../utils/util.js')
let col1H = 0;
let col2H = 0;
let prepared = true;
Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
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
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      // console.log(img.id)
      // console.log(imageId)
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
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };

    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },
  loadImages() {
    let images = [];
    let self = this;
    wx.request({
      url: 'http://localhost:3030/api/getIndexDemand',
      method: 'GET',
      dataType: 'json',
      success: (res) => {
        console.log(res.data);
        images = res.data;
        let baseId = "img-" + (+new Date());
        for (let i = 0; i < images.length; i++) {
          images[i].id = baseId + "-" + i;
        }
        self.setData({
          loadingCount: images.length,
          images: images
        });

      }
    })
  },
  //更新图片,预加载
  refreshImage() {
    if (prepared == true) {
      this.loadImages();
    }
  }

})