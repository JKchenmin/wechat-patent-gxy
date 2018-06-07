import util from '../../../utils/util.js'
let postData = {
  reqType: 0,
  perception: {
    inputText: {
      text: ""
    },
    inputImage: {
      url: ""
    },
    selfInfo: {
      location: {
        city: "",
        province: "",
        street: ""
      }
    }
  },
  userInfo: {
    apiKey: "0b0f2a326294402d891cf493b7722add", //我的api key
    userId: new Date().getTime()
  }
}
let app = getApp();
// 封装请求数据
Page({
  data: {
    robotInfo: {
      imgUrl: 'http://wx3.sinaimg.cn/mw690/896d20a7gy1fs2oky5m8aj201s01smwy.jpg'
    },//机器人的信息
    userInfo: {
      imgUrl: app.globalData.userInfo.avatarUrl
    },//登录用户的信息
    dialog: {
      length: 0,
      data: [
        {
          time: '',
          text: '你好，我是机器人Sotyoyo',
          robot: true,
          imgUrl: '',
        }
      ]
    },//对话历史记录，一条一条
    inputText: ''//正在输入的信息
  },
  onLoad() {
    let self = this;
    wx.request({
      url: 'http://localhost:3030/api/getProfileDialog',
      method: 'GET',
      dataType: 'json',
      success: res => {
        self.setData({
          dialog: res.data.dialog
        })
      }
    })
  },
  //输入框自动更新
  changeVal(e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  //点击发送按钮
  sendText() {
    let self = this
    //第一步，包装数据发送POST请求给图灵机器人
    
    //2. location
    postData.perception.selfInfo.location.city = app.globalData.client.address_component.city;
    postData.perception.selfInfo.location.province = app.globalData.client.address_component.province;
    postData.perception.selfInfo.location.street = app.globalData.client.address_component.street;
    //3. inputText
    postData.perception.inputText.text = self.data.inputText;
    //第二步，发送请求到v2 api
    wx.request({
      url: 'http://openapi.tuling123.com/openapi/api/v2',
      //省着点用次数，先放个假的
      //url: 'https://easy-mock.com/mock/5afbf572c910be77a053fb00/example/api/cook',
      data: postData,
      method: 'POST',
      dataType: 'json',
      success: res => {
        //修改res的格式
        let dialog = util.formatDialog(res.data);
        let dialogData = JSON.parse(JSON.stringify(dialog));
        
        //第三步，把信息更新到视图
        let obj = {
          time: util.formatTime(new Date()),
          text: self.data.inputText,
          robot: false,
          imgUrl: '',
          cook: {},
          hotel: {}
        };
        dialogData.dialog.unshift(obj)
        console.log(dialogData)
        //第四步，跟新服务器端数据
        wx.request({
          url: 'http://localhost:3030/api/setDialog',
          data: dialogData,
          method: 'POST',
          dataType: 'json',
          header: app.globalData.header,
          success: (res) => {
            console.log(res);
            wx.request({
              url: 'http://localhost:3030/api/getProfileDialog',
              method: 'GET',
              dataType: 'json',
              success: res => {
                util.formatGetDialog(res.data.dialog)
                self.setData({
                  dialog: res.data.dialog
                })
              }
            })
          },
          fail: res => {
            console.error("dialog上传服务器出错啦!");
            console.log(res);
          }
        })
      },
      fail: res => {
        console.error("调用图灵机器人API出错啦！");
        console.log(res);
      }
    })
    

  }

})