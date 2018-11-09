// pages/search/search.js
import ajax from "../../utils/request.js"

Page({
  data: {
    inputShowed: true,
    inputVal: "",
    hotList: {},
    historyList: wx.getStorageSync("historySearch") || []
  },
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
  //获取热门搜索list
  getHotList() {
    ajax.get("/api/v1/ht_hotSearch")
      .then(resp => {
        this.setData({
          hotList: resp.data.data
        });
      })
  },
  //换一批
  changeHot() {
    this.getHotList();
  },
  //搜索
  goToList(e) {
    wx.navigateTo({
      url: `/pages/list/list?keyword=${e.currentTarget.dataset.item.title}`,
    })
    const newList = this.data.historyList.filter(item => item.id !== e.currentTarget.dataset.item.id);
    newList.unshift(e.currentTarget.dataset.item)
    this.setData({
      historyList: newList
    }, () => {
      //存入storage中
      wx.setStorageSync("historySearch", this.data.historyList)
      //跳转到搜索结果页面
    });
   
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})