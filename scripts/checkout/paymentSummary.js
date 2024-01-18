import {
  cart,
  calculateOrderSubtotal,
  clearCart,
  refreshCartQuantity
} from "../../data/cart.js"
import {
  calculateShippingCost,
  calculateTotalBeforeTax,
  formatCurrency,
  formatTaxToPercentValue,
  calculateTax,
  calculateOrderTotal
} from "../utils/money.js"
import { addToOrders } from "../../data/orders.js"

export function renderPaymentSummary() {
  displayPaymentSummaryHTML()
  refreshCartQuantity()
  setupPlaceOrderButton()

  function displayPaymentSummaryHTML() {
    let paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (<span class="js-cart-quantity"></span>):</div>
      <div class="payment-summary-money js-payment-summary-subtotal"></div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-and-handling-total"></div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-pre-tax-total"></div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (${formatTaxToPercentValue()}%):</div>
      <div class="payment-summary-money js-tax"></div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-order-total"></div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `
    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML
    refreshPaymentSummary()
  }

  function refreshPaymentSummary() {
    const subtotal = calculateOrderSubtotal()
    const subtotalEl = document.querySelector(".js-payment-summary-subtotal")
    subtotalEl.textContent = `$${formatCurrency(subtotal)}`

    const shippingTotal = calculateShippingAndHandlingTotal()
    const shippingTotalEl = document.querySelector(
      ".js-shipping-and-handling-total"
    )
    shippingTotalEl.textContent = `$${formatCurrency(shippingTotal)}`

    const totalBeforeTax = calculateTotalBeforeTax(subtotal, shippingTotal)
    const totalBeforeTaxEl = document.querySelector(".js-pre-tax-total")
    totalBeforeTaxEl.textContent = `$${formatCurrency(totalBeforeTax)}`

    const tax = calculateTax(totalBeforeTax)
    const taxEl = document.querySelector(".js-tax")
    taxEl.textContent = `$${formatCurrency(tax)}`

    const orderTotal = calculateOrderTotal(totalBeforeTax)
    const orderTotalEl = document.querySelector(".js-order-total")
    orderTotalEl.textContent = `$${formatCurrency(orderTotal)}`
  }

  function calculateShippingAndHandlingTotal() {
    let totalCents = 0
    document.querySelectorAll(".js-delivery-option-input").forEach(option => {
      if (option.checked) {
        totalCents += calculateShippingCost(option.value)
      }
    })
    return totalCents
  }

  function setupPlaceOrderButton() {
    document
      .querySelector(".js-place-order-button")
      .addEventListener("click", () => {
        console.log("fun")
        addToOrders(cart)
        clearCart()
        window.location.href = "./history.html"
      })
  }
}
