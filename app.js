//app.js
import store from "./store/store.js"

App({
  onLaunch: function () {
    //添加badge
    store.subscribe(this.setBadge)
    this.setBadge();

  },
  setBadge() {
    this.cart = store.getState().cart.data || [];
    const total = this.cart.reduce((result, item) => {
      result += item.count;
      return result;
    }, 0)
    wx.setTabBarBadge({
      index: 2,
      text:`${total}`
    })
  },

  globalData: {
    userInfo: null
  }
})