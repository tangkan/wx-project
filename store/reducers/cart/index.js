const initState = {
  data: wx.getStorageSync("ht-cart") || [],
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
          count: 1,
          isChecked:true
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

      //将修改后的数据存入storage
      wx.setStorageSync('ht-cart', addData);

      return Object.assign({}, state, {
        data: addData
      })

    case "REDUCE":
      const reData = state.data.reduce((result,item) => {
        if (item.id === action.id) {
            item.count -= 1;
        }
        if(item.count > 0){
          result.push(item)
        }
        return result
      },[])

      //将修改后的数据存入storage
      wx.setStorageSync('ht-cart', reData);

      return Object.assign({}, state, {
        data: reData
      })

    case "CHANGECHECKED":
      const chData = state.data.map(item => {
        if (item.id === action.id) {
          item.isChecked = !item.isChecked
        }
        return item
      })

      //将修改后的数据存入storage
      wx.setStorageSync('ht-cart', chData);

      return Object.assign({}, state, {
        data: chData
      })

    case "CHANGEALLCHECKED":
      const chAllData = state.data.map(item => {
        item.isChecked = action.bool;
        return item
      })

      //将修改后的数据存入storage
      wx.setStorageSync('ht-cart', chAllData);

      return Object.assign({}, state, {
        data: chAllData
      })

    case "DELETEGOODS":
      const deData = state.data.filter(item => item.id !== action.id)

      //将修改后的数据存入storage
      wx.setStorageSync('ht-cart', deData);

      return Object.assign({}, state, {
        data: deData
      })
    default:
      return state
  }
}