import ajax from "../../utils/request.js";
import store from "../../store/store.js";
import { addToCart } from "../../store/actions/cart.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["热门", "销量", "价格", "品牌"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    listData:[],
    page:1,
    total:0
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    //每次切换后重新求情数据
    this.setData({
      listData:[]
    },() => {
      this.getListData();
    });
  },
  getListData() {
    ajax.get(`/api/v1/s_list?id=${this.data.activeIndex}`)
      .then(res => {
        this.setData({
          listData: this.data.listData.concat(res.data.data)
        });
      })
  },
  //加载更多
  loadMore() {
    this.getMoreData();
  },
  //加载list数据
  getMoreData() {
    if (this.data.page === this.data.total) {
      return
    }
    ajax.get("/api/v1/s_list")
      .then(res => {
        this.setData({
          total: res.data.total,
          listData: this.data.listData.concat(res.data.data)
        }, () => {
          this.setData({
            page: this.data.page + 1
          });
        });
      })
  },
  //跳转到详情页面
  goToDetail(e) {
    wx.navigateTo({
      url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },
  //加入购物车
  addCart(e) {
    store.dispatch(addToCart(e.currentTarget.dataset.cart));
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.id)
    //通过获取到的id去请求数据
    ajax.get(`/api/v1/s_list?id=${options.id}`)
      .then(res => {
        this.setData({
          listData: this.data.listData.concat(res.data.data)
        });
      })
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