// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: wx.getStorageSync("userInfo").isLogin || false,
    nickName: wx.getStorageSync("userInfo").nickName || '游客',
    avatarUrl: wx.getStorageSync("userInfo").avatarUrl || '',
    location: wx.getStorageSync("location") || '未定位…'
  },
  bindGetUserInfo (e){
    this.setData({
      nickName: e.detail.userInfo.nickName,
      avatarUrl: e.detail.userInfo.avatarUrl,
      isLogin: true
    });
    const userInfo = {};
    userInfo.nickName = e.detail.userInfo.nickName;
    userInfo.avatarUrl = e.detail.userInfo.avatarUrl;
    userInfo.isLogin = true;
    //存入storage中
    wx.setStorageSync("userInfo", userInfo);
    // 登录成功获取定位信息
    wx.getLocation({
      success: (res) => {
        //获取地址详情
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res.latitude},${res.longitude}&key=RVTBZ-CGBWV-57TPB-UH35H-MQWTO-5PBA4&get_poi=1`,
          success: (res) => {
            this.setData({
              location: res.data.result.address_component.city
            });
            wx.setStorageSync('location', res.data.result.address_component.city)
          }
        })

      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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