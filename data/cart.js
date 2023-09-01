export let cart = JSON.parse(localStorage.getItem('cart'))
import {products} from "./products.js"
import {formatCurrency} from "../scripts/utils/money.js"

if(!cart) {
  cart = []
  saveToStorage()
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function calculateCartQuantity(){
  let cartQuantity = 0
  cart.forEach(cartItem => {
    cartQuantity += cartItem.quantity
  })
  return cartQuantity
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
  matchingItem ? 
  matchingItem.quantity += addQuantity : 
  cart.push(
    {
      productId,
      quantity: addQuantity
    }
  )
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

export function returnMatchingProductFromId(productId){
    let matchingProduct
    products.forEach(product => {
      if(product.id === productId) {
        matchingProduct = product
      }
    })
  return matchingProduct
}

export function calculateOrderSubtotal(){
  let subtotal = 0
  cart.forEach(cartItem => {
    subtotal += cartItem.quantity * returnMatchingProductFromId(cartItem.productId).priceCents
  })
  return formatCurrency(subtotal)
}