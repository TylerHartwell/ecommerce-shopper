import {updateQuantity, calculateCartQuantity, cart, removeFromCart, calculateOrderSubtotal} from "../data/cart.js"
import { products } from "../data/products.js"
import { calculateShippingCost, formatCurrency } from "./utils/money.js"

updateCheckoutQuantity()
displayCartCardsHTML()
displayPaymentSummaryHTML()
setupDeleteLinks()
setupUpdateLinks()
setupSaveLinks()
setupPressEnterInputSave()
setupShippingLinks()

function updateCheckoutQuantity(){
  const checkoutQuantityEl = document.querySelector('.js-checkout-quantity')
  checkoutQuantityEl.textContent = calculateCartQuantity()
}

function displayCartCardsHTML(){
  let cartCardsHTML = ''
  cart.forEach(cartItem => {
    const productId = cartItem.productId
    let matchingProduct
  
    products.forEach(product => {
      if(product.id === productId) {
        matchingProduct = product
      }
    })
  
    cartCardsHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                Update
              </span>
              <input class="quantity-input js-quantity-input" data-product-id="${matchingProduct.id}">
              <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input js-delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                value="low">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  ${calculateShippingCost("low") === 0 ? "FREE" : "$" + formatCurrency(calculateShippingCost("low")) + " -"} Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input js-delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                value="medium">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                $${formatCurrency(calculateShippingCost("medium"))} - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input js-delivery-option-input"
                name="delivery-option-${matchingProduct.id}"
                value="high">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $${formatCurrency(calculateShippingCost("high"))} - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
  
  document.querySelector('.js-order-summary').innerHTML = cartCardsHTML
}

function calculateShippingAndHandlingTotal(){
  let totalCents = 0
  document.querySelectorAll('.js-delivery-option-input').forEach(option => {
    if(option.checked){
      totalCents += calculateShippingCost(option.value)
    }
  })
  return formatCurrency(totalCents)
}

function displayPaymentSummaryHTML(){
  let paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money js-payment-summary-subtotal">$${calculateOrderSubtotal()}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-and-handling-total">$${calculateShippingAndHandlingTotal()}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$47.74</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$4.77</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$52.51</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML
}

function updatePaymentSummary(){
  const paymentSummarySubtotalEl = document.querySelector('.js-payment-summary-subtotal')
  paymentSummarySubtotalEl.textContent = `$${calculateOrderSubtotal()}`
  const shippingAndHandlingTotalEl = document.querySelector('.js-shipping-and-handling-total')
  shippingAndHandlingTotalEl.textContent = `$${calculateShippingAndHandlingTotal()}`
}

function setupShippingLinks(){
  document.querySelectorAll('.js-delivery-option-input').forEach(link => {
    link.addEventListener('click', () => {
      updatePaymentSummary()
    })
  })
}

function setupDeleteLinks(){
  document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset
      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      removeFromCart(productId)
      container.remove()
      updateCheckoutQuantity()
      updatePaymentSummary()
    })
  })
}

function setupUpdateLinks(){
  document.querySelectorAll('.js-update-link').forEach(link => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset
      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.add('is-editing-quantity')
    })
  })
}

function setupSaveLinks(){
  document.querySelectorAll('.js-save-link').forEach(link => {
    link.addEventListener('click', () => {
      const {productId} = link.dataset
      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.remove('is-editing-quantity')
      const quantityInput = document.querySelector(`.js-quantity-input[data-product-id="${productId}"]`)
      const newQuantity = Number(quantityInput.value)
      if(newQuantity > 0 && newQuantity < 1000){
        updateQuantity(productId, newQuantity)
        updateCheckoutQuantity()
        updatePaymentSummary()
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
        quantityLabel.textContent = newQuantity
      }
      if(newQuantity === 0){
        removeFromCart(productId)
        container.remove()
        updateCheckoutQuantity()
        updatePaymentSummary()
      }
    })
  })
}

function setupPressEnterInputSave(){
  document.querySelectorAll('.js-quantity-input').forEach(input => {
    input.addEventListener('keypress', e => {
      const {productId} = input.dataset
      if(e.key === "Enter"){
        e.preventDefault()
        document.querySelector(`.js-save-link[data-product-id="${productId}"]`).click()
      }
    })
  })
}
