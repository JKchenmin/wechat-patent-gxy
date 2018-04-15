export default Component({
  data: {},
  methods: {
    showDialog() {
      let dialogComponent = this.selectComponent('.wxc-dialog');
      dialogComponent && dialogComponent.show();
    },
    hideDialog() {
      let dialogComponent = this.selectComponent('.wxc-dialog');
      dialogComponent && dialogComponent.hide();
    },
    onConfirm() {
      console.log('点击了确认按钮');
      this.hideDialog();
    },
    onCancel() {
      console.log('点击了取消按钮');
      this.hideDialog();
    },
    testPost(){
      wx.request({
        url: 'http://www.jitsose.cn/register_android.do', 
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: {
          username: 'sotyoyo4',
          pwd: 'sotyoyo4'
        },
        success: function (res) {
          console.log(res)
        },
        fail: function(res) {
          console.log("对不起，你失败了\n" + res.data);
        }
      })
      
    }
  }
});