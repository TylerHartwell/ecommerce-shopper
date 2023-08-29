export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
  cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
  },{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
  }]
}

export function calculateCartQuantity(){
  let cartQuantity = 0

  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity
  })
  return cartQuantity
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId){
  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`)
  const addQuantity = Number(quantitySelector.value)
  let matchingItem

  cart.forEach(cartItem => {
      if(productId === cartItem.productId){
          matchingItem = cartItem
      }
  })

  if(matchingItem){
      matchingItem.quantity += addQuantity
  } else {
      cart.push({productId,
          quantity: addQuantity
      })
  }

  saveToStorage()
}

export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId)
  saveToStorage()
}

export function updateQuantity(productId, newQuantity){
  cart.forEach(cartItem => {
    if(cartItem.productId === productId){
      cartItem.quantity = newQuantity
    }
  })
  saveToStorage()
}
