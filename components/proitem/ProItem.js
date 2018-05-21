
Component({
  properties: {
    imgUrl: {
      type: String,
      value: ''
    },
    
  },

  data: {
    collapsed: true
  },

  attached: function () {
    console.log('component attached!');
  },

  detached: function () {
    console.log('component dettached!');
  },

  methods: {
    onImageLoad: function (e) {
      // let imageId = e.currentTarget.id;
      console.log(e.detail);
      let oImgW = e.detail.width;         //图片原始宽度
      let oImgH = e.detail.height;        //图片原始高度
      let scale = 200 / oImgW;        //比例计算
      // let imgHeight = scale * oImgH;
      // let imgObj = {
      //   id: imageId,
      //   width: imgWidth,
      //   height: imgHeight
      // };
      // imgLen++;
      // for (let i = 0; i < temResImgArr.length; i++) {
      //   if (temResImgArr[i].id == imageId) {
      //     temResImgArr[i].width = imgWidth;
      //     temResImgArr[i].height = imgHeight;
      //     break;
      //   }
      // }
      // if (imgLen == temResImgArr.length) {//图片遍历完
      //   this.waterFall();
      // }

    },
    onImageError: function (e) {
      // imgLen++;
    }
  }
})
