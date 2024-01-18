//connect tracking
//style order delete button
import {
  updateQuantity,
  cart,
  removeFromCart,
  updateShipping,
  refreshCartQuantity
} from "../../data/cart.js"
import products from "../../data/products.js"
import { formatCurrency } from "../utils/money.js"
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../../data/deliveryOptions.js"

export function renderCartSummary() {
  displayCartCardsHTML()
  refreshCartQuantity()
  setupDeleteLinks()
  setupUpdateLinks()
  setupSaveLinks()
  setupPressEnterInputSave()
  setupShippingLinks()

  function displayCartCardsHTML() {
    let cartCardsHTML = ""

    if (cart.length < 1) {
      cartCardsHTML += `
      <div class="cart-item-container">
        <div>Your cart is empty.</div>
      </div>
    `
    } else {
      cart.forEach(cartItem => {
        const productId = cartItem.productId
        const matchingProduct = products.find(
          product => product.id === productId
        )
        const deliveryOptionPriority = cartItem.priority
        const deliveryOption = deliveryOptions.find(
          option => option.priority === deliveryOptionPriority
        )
        const today = dayjs()
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days")
        const dateString = deliveryDate.format("dddd, MMMM D")

        cartCardsHTML += `
        <div class="cart-item-container js-cart-item-container-${
          matchingProduct.id
        }">
          <div class="delivery-date">
            Delivery date: <span class="js-delivery-date-${
              matchingProduct.id
            }">${dateString}</span>
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
                  Quantity: <span class="quantity-label js-quantity-label-${
                    matchingProduct.id
                  }">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${
                  matchingProduct.id
                }">
                  Update
                </span>
                <input class="quantity-input js-quantity-input" data-product-id="${
                  matchingProduct.id
                }">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${
                  matchingProduct.id
                }">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
            </div>
    
            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
          </div>
        </div>
      `
      })
    }
    document.querySelector(".js-order-summary").innerHTML = cartCardsHTML
    setSelectedDeliveryDate()
  }

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = ""

    deliveryOptions.forEach(deliveryOption => {
      const today = dayjs()
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days")
      const dateString = deliveryDate.format("dddd, MMMM D")
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : "$" + formatCurrency(deliveryOption.priceCents) + " -"

      const isChecked = deliveryOption.priority === cartItem.priority

      html += `
      <div class="delivery-option js-delivery-option">
        <input type="radio" ${isChecked ? "checked" : ""}
          class="delivery-option-input js-delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
          value="${deliveryOption.priority}" data-product-id="${
        matchingProduct.id
      }">
        <div>
          <div class="delivery-option-date js-delivery-option-date-${
            deliveryOption.priority
          }-${matchingProduct.id}">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
    })
    return html
  }

  function setupShippingLinks() {
    document.querySelectorAll(".js-delivery-option").forEach(element => {
      element.addEventListener("click", () => {
        const radioEl = element.querySelector(".js-delivery-option-input")
        radioEl.checked = true
        const { productId } = radioEl.dataset
        refreshPaymentSummary()
        updateShipping(productId, radioEl.value)
        setSelectedDeliveryDate()
      })
    })
  }

  function setupDeleteLinks() {
    document.querySelectorAll(".js-delete-link").forEach(link => {
      link.addEventListener("click", () => {
        const { productId } = link.dataset
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        )
        removeFromCart(productId)
        container.remove()
        refreshCartQuantity()
        refreshPaymentSummary()
        if (cart.length < 1) {
          displayCartCardsHTML()
        }
      })
    })
  }

  function setupUpdateLinks() {
    document.querySelectorAll(".js-update-link").forEach(link => {
      link.addEventListener("click", () => {
        const { productId } = link.dataset
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        )
        container.classList.add("is-editing-quantity")
      })
    })
  }

  function setupSaveLinks() {
    document.querySelectorAll(".js-save-link").forEach(link => {
      link.addEventListener("click", () => {
        const { productId } = link.dataset
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        )
        container.classList.remove("is-editing-quantity")
        const quantityInput = document.querySelector(
          `.js-quantity-input[data-product-id="${productId}"]`
        )
        const newQuantity = Number(quantityInput.value)
        if (newQuantity > 0 && newQuantity < 1000) {
          updateQuantity(productId, newQuantity)
          refreshCartQuantity()
          const quantityLabel = document.querySelector(
            `.js-quantity-label-${productId}`
          )
          quantityLabel.textContent = newQuantity
        }
        if (newQuantity === 0) {
          document
            .querySelector(`.js-delete-link[data-product-id="${productId}"]`)
            .click()
        }
      })
    })
  }

  function setupPressEnterInputSave() {
    document.querySelectorAll(".js-quantity-input").forEach(input => {
      input.addEventListener("keypress", e => {
        const { productId } = input.dataset
        if (e.key === "Enter") {
          e.preventDefault()
          document
            .querySelector(`.js-save-link[data-product-id="${productId}"]`)
            .click()
        }
      })
    })
  }

  function setSelectedDeliveryDate() {
    cart.forEach(cartItem => {
      const productId = cartItem.productId
      const selectedDateText = document.querySelector(
        `.js-delivery-option-date-${cartItem.priority}-${productId}`
      ).textContent
      document.querySelector(`.js-delivery-date-${productId}`).textContent =
        selectedDateText
      cartItem.dateArrival = selectedDateText
    })
  }
}
