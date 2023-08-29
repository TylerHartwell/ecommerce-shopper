export const cart = []

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
}