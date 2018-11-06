export default {
  get(url){
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve,reject) => {
      wx.request({
        url:`http://rap2api.taobao.org/app/mock/85803${url}`,
        method: 'GET',
        dataType: 'json',
        success: function(res) {
          resolve(res)
        },
        fail: function(res) {
          reject(res)
        },
        complete: function(res) {
          wx.hideLoading()
        },
      })
    })
  }
}