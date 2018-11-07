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