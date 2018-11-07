import store from "../../store/store.js"
import {
  addCount,
  reduceCount
} from "../../store/actions/cart.js"

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    allCount: 0
  },
  //添加数量
  addCartCount(e) {
    store.dispatch(addCount(e.currentTarget.dataset.id))
  },
  //减少数量
  reduceCartCount(e) {
    store.dispatch(reduceCount(e.currentTarget.dataset.id))
  },
  //获取store中的数据
  getDataFromStore() {
    //计算总数
    const allCount = store.getState().cart.data.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    this.setData({
      listData: store.getState().cart.data,
      allCount
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataFromStore();
    //去监听store中数据的变化
    store.subscribe(this.getDataFromStore)
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