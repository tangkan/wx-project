import store from "../../store/store.js"
import {
  addCount,
  reduceCount,
  changeChecked,
  changeAllChecked,
  deleteGoods
} from "../../store/actions/cart.js"

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    allCount: 0,
    allPrice:0,
    allChecked: true
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
    //计算全选
    const allChecked = store.getState().cart.data.every(item => {
      return item.isChecked === true;
    })
    //计算总数
    const allCount = store.getState().cart.data.filter(item => item.isChecked === true).reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    //计算总价
    const allPrice = store.getState().cart.data.filter(item => item.isChecked === true).reduce((result, item) => {
      result += item.count * item.price;
      return result;
    }, 0).toFixed(2);

    this.setData({
      listData: store.getState().cart.data,
      allCount,
      allChecked,
      allPrice
    });
  },
  //选中框改变触发事件
  changeChecked(e) {
    store.dispatch(changeChecked(e.currentTarget.dataset.id));
  },
  //全选的状态事件
  changeAllChecked() {
    store.dispatch(changeAllChecked(!this.data.allChecked));
  },
  //删除商品
  deletegoods(e) {
    wx.showModal({
      title: '确认删除',
      content: '您确定要删除该商品吗？',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) {
          store.dispatch(deleteGoods(e.currentTarget.dataset.id))
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 1500
          });
        } else {
          return
        }
      }
    });
  },
  goToHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
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