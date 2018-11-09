export const addToCart = (cartItem) => {
  return{
    type:"ADDTOCART",
    cartItem
  }
}

export const addCount = (id) => {
  return{
    type:"ADD",
    id
  }
}

export const reduceCount = (id) => {
  return {
    type: "REDUCE",
    id
  }
}

export const changeChecked = (id) => {
  return {
    type: "CHANGECHECKED",
    id
  }
}

export const changeAllChecked = (bool) => {
  return {
    type: "CHANGEALLCHECKED",
    bool
  }
}

export const deleteGoods = (id) => {
  return {
    type: "DELETEGOODS",
    id
  }
}
