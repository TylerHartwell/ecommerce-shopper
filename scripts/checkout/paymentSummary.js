import { calculateTotalCartQuantity, cart, clearCart } from "../../data/cart.js"
import { getProduct } from "../../data/products.js"
import {
  calculateTotalBeforeTax,
  formatCurrency,
  formatTaxToPercentValue,
  calculateTax
} from "../utils/money.js"
import { addToOrders } from "../../data/orders.js"
import { getDeliveryOption } from "../../data/deliveryOptions.js"

export function renderPaymentSummary() {
  let totalProductPriceCents = 0
  let totalShippingPriceCents = 0

  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productId)
    totalProductPriceCents += product.priceCents * cartItem.quantity

    const deliveryOption = getDeliveryOption(cartItem.priority)
    totalShippingPriceCents += deliveryOption.priceCents
  })

  const totalBeforeTax = calculateTotalBeforeTax(
    totalProductPriceCents,
    totalShippingPriceCents
  )
  const totalTax = calculateTax(totalBeforeTax)
  const totalCents = totalBeforeTax + totalTax

  let paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (<span class="js-cart-quantity">${calculateTotalCartQuantity()}</span>):</div>
      <div class="payment-summary-money js-payment-summary-subtotal">${formatCurrency(
        totalProductPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money js-shipping-and-handling-total">${formatCurrency(
        totalShippingPriceCents
      )}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money js-pre-tax-total">${formatCurrency(
        totalBeforeTax
      )}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (${formatTaxToPercentValue()}%):</div>
      <div class="payment-summary-money js-tax">${formatCurrency(
        totalTax
      )}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money js-order-total">${formatCurrency(
        totalCents
      )}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  `
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML

  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", () => {
      addToOrders(cart)
      clearCart()
      window.location.href = "./history.html"
    })
}
