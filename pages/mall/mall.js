import ajax from "../../utils/request.js"

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    navData:[]
  },
  //搜索功能
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //跳转到列表页
  goToList(e) {
    wx.navigateTo({
      url: `/pages/list/list?id=${e.currentTarget.dataset.id}`,
    })
  },
  //跳转打牌搜索页面
  goToSearch(e) {
    //跳转到搜索页面
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //获取导航栏信息
  onLoad() {
    ajax.get("/api/v1/fenlei")
      .then(res => {
        this.setData({
          navData: res.data.data
        });
      })
  }
});