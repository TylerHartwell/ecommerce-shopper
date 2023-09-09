import { refreshCartQuantity } from "../data/cart.js"
import { orders } from "../data/orders.js"
import { products } from "../data/products.js"


refreshCartQuantity('.js-cart-quantity')
displayOrdersHTML()

function displayOrdersHTML() {
  let ordersHTML = ''
  orders.forEach(order => {
    ordersHTML += `
      <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.datePlaced}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.total}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.orderId}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details-grid">
          ${displayOrderCardsHTML(order)}
        </div>
      </div>
    `
})
  document.querySelector('.js-orders-grid').innerHTML = ordersHTML
}

function displayOrderCardsHTML(order){
  let orderCardsHTML = ''
  order.cart.forEach(cartItem => {
    const productId = cartItem.productId
    let matchingProduct
  
    products.forEach(product => {
      if(product.id === productId) {
        matchingProduct = product
      }
    })

    orderCardsHTML += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${order.dateArrival}
        </div>
        <div class="product-quantity">
          Quantity: ${cartItem.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `
  })
  return orderCardsHTML
}