import ajax from "../../utils/request.js";
import store from "../../store/store.js";
import { addToCart } from "../../store/actions/cart.js";

const app = getApp();

Page({
  data: {
    listData:{},
    count:0
  },
  onLoad(opations) {
    //从store中获取数量
    this.getDataFromStore();
    store.subscribe(this.getDataFromStore);
    //加载轮播图数据
    ajax.get(`/api/v1/ht_detail?id=${opations.id}`)
      .then(res => {
        this.setData({
          listData: res.data.data
        });
      })
  },
  onUnload() {
    app.setBadge();
  },
  addCart(e) {
    store.dispatch(addToCart(e.currentTarget.dataset.cart));
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      duration: 1500
    });
  },
  getDataFromStore() {
    const allCount = store.getState().cart.data.reduce((result,item) => {
      result += item.count;
      return result;
    },0)
    this.setData({
      count: allCount
    });
  },
  //跳转到购物车
  goToCart() {
    wx.switchTab({
      url: "/pages/cart/cart",
    })
  }
})