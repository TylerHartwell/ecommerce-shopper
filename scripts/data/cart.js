import { products } from "./products.js"

export let cart

loadFromStorage()

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"))
  if (!cart) {
    clearCart()
  }
}
export function clearCart() {
  cart = []
  saveToStorage()
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function calculateTotalCartQuantity() {
  let cartQuantity = 0
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity
  })
  return cartQuantity
}

export function addToCart(productId, qty) {
  let addQuantity = qty
  if (!qty) {
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`
    )
    addQuantity = Number(quantitySelector.value)
  }

  let matchingItem
  cart.forEach(cartItem => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })
  matchingItem
    ? (matchingItem.quantity += addQuantity)
    : cart.push({
        productId,
        quantity: addQuantity,
        priority: "low",
        dateArrival: "2023-12-12"
      })
  saveToStorage()
}

export function removeFromCart(productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId)
  saveToStorage()
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity
    }
  })
  saveToStorage()
}

export function updateShipping(productId, priority) {
  cart.forEach(cartItem => {
    if (cartItem.productId === productId) {
      cartItem.priority = priority
    }
  })
  saveToStorage()
}

export function returnMatchingProductFromId(productId) {
  let matchingProduct
  products.forEach(product => {
    if (product.id === productId) {
      matchingProduct = product
    }
  })
  return matchingProduct
}

export function calculateOrderSubtotal() {
  let subtotal = 0
  cart.forEach(cartItem => {
    subtotal +=
      cartItem.quantity *
      returnMatchingProductFromId(cartItem.productId).priceCents
  })
  return subtotal
}
