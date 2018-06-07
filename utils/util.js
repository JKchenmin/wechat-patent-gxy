//日期格式化函数
const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//响应图灵机器人接口包装dialog函数
const formatDialog = (getData) => {
  let dialog = {};
  let returnArr = [];
  let text = '';
  let cook = {};
  let hotel = {};
  getData.results.forEach(function (item, index) {
    // console.log(item);
    if (item.resultType == "text") {
      let obj = {
        time: formatTime(new Date()),
        text: '',
        robot: true,
        imgUrl: '',
        cook: {},
        hotel: {}
      };
      obj.text = item.values.text;
      returnArr.push(obj);
    } else if (item.resultType == "news") {
      
      item.values.news.forEach(function (item, index) {
        let obj = {
          time: formatTime(new Date()),
          text: '',
          robot: true,
          imgUrl: '',
          cook: {},
          hotel: {}
        };
        Object.assign(obj.cook, item);
        returnArr.push(obj);
      })
    } else if (item.resultType == "url") {
      let obj = {
        time: formatTime(new Date()),
        text: '',
        robot: true,
        imgUrl: '',
        cook: {},
        hotel: {}
      };
      Object.assign(obj.hotel, item.values.url);
      returnArr.push(obj);
    }
  })
  dialog.dialog = new Array;
  dialog.dialogId = app.globalData.client.dialogId;
  dialog.openId = app.globalData.openId;
  dialog.dialog = returnArr;

  return dialog;
}
const formatGetDialog = (getData) => {
  console.log(getData)

}
module.exports = {
  formatTime: formatTime,
  formatDialog: formatDialog,
  formatGetDialog: formatGetDialog
}
