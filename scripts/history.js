import { addToCart, refreshCartQuantity } from "../data/cart.js"
import { orders, removeFromOrders } from "../data/orders.js"
import { products } from "../data/products.js"


refreshCartQuantity()
displayOrdersHTML()
setupBuyAgainButtons()
setupDeleteLinks()

function displayOrdersHTML() {
  let ordersHTML = ''

  //make style for class="order-none"
  if(orders.length < 1){
    ordersHTML += `
      <div class="order-none">
        <div>You haven't placed any orders yet.</div>
      </div>
    `
  }else {
    orders.forEach(order => {
      ordersHTML += `
        <div class="order-container js-order-container-${order.orderId}">
  
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.datePlaced}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>${order.total}</div>
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

          <div>
            <button class="button-delete js-delete-order-button" data-order-id="${order.orderId}">
            Delete order from history
            </button>
          </div>
        </div>
      `
    })
  }
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
          Arriving on: ${cartItem.dateArrival}
        </div>
        <div class="product-quantity">
          Quantity: ${cartItem.quantity}
        </div>
        <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${matchingProduct.id}">
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

function setupBuyAgainButtons(){
  document.querySelectorAll(`.js-buy-again-button`).forEach(button => {
      button.addEventListener('click', () => {
          const {productId} = button.dataset
          addToCart(productId, 1)
          refreshCartQuantity()
      })
  })
}

function setupDeleteLinks(){
  document.querySelectorAll('.js-delete-order-button').forEach(link => {
    link.addEventListener('click', () => {
      const {orderId} = link.dataset
      const container = document.querySelector(`.js-order-container-${orderId}`)
      removeFromOrders(orderId)
      container.remove()
      if(orders.length < 1){
        displayOrdersHTML()
      }
    })
  })
}