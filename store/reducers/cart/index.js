const initState = {
  data: wx.getStorageSync("ht-cart") || []
}

export default (state = initState, action) => {
  switch (action.type) {
    case "ADDTOCART":
      const { cartItem } = action;
      const { data } = state;
      //判断购物车中是否存在该商品
      const isInCart = data.some( item => item.id === cartItem.id);
      let newData = [];
      if(isInCart){
        //存在就让其count加1
        newData = data.map(item => {
          if (item.id === cartItem.id){
            item.count += 1;
          }
          return item
        })
      }else{
        newData = data.concat({
          ...cartItem,
          count: 1
        })
      }
      //将其存入Storage中
      wx.setStorageSync('ht-cart', newData);
      return Object.assign({}, state, {
        data: newData
      })

    case "ADD":
      const addData = state.data.map( item => {
        if(item.id === action.id){
          item.count += 1;
        }
        return item
      })

      //将修改后的数据存入stirage
      wx.setStorageSync('ht-cart', addData);

      return Object.assign({}, state, {
        data: addData
      })

    case "REDUCE":
      const reData = state.data.map(item => {
        if (item.id === action.id) {
          item.count -= 1;
        }
        return item
      })

      //将修改后的数据存入stirage
      wx.setStorageSync('ht-cart', reData);

      return Object.assign({}, state, {
        data: reData
      })
    default:
      return state
  }
}