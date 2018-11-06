import ajax from "../../utils/request.js"

Page({
  data: {
    inputShowed: false,
    inputVal: "",
    imgUrls: [],
    listData:[],
    page:1,
    total:0
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
  //加载list数据
  getMoreData() {
    if (this.data.page === this.data.total) {
      return
    }
    ajax.get("/api/v1/ht_list")
      .then(res => {
        this.setData({
          total: res.data.total,          
          listData: this.data.listData.concat(res.data.data)
        }, () => {
          this.setData({
            page:this.data.page + 1
          });
        });
      })
  },
  //加载更多
  loadMore() {
    this.getMoreData();
  },
  onLoad() {
    //加载轮播图数据
    ajax.get("/api/v1/swiper")
      .then(res => {
        this.setData({
          imgUrls: res.data.data.img
        });
      })
    
    //加载list数据
    this.getMoreData();
    
  }
});