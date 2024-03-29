import { addToCart } from "./data/cart.js"
import { products } from "./data/products.js"
import { formatCurrency } from "./utils/money.js"
import { calculateTotalCartQuantity } from "./data/cart.js"

const addedToCartTimeouts = {}

renderAmazonHeader()
displayProductsHTML()

function renderAmazonHeader() {
  const amazonHeaderHTML = `
    <div class="amazon-header">
      <div class="amazon-header-left-section">
        <a href="index.html" class="header-link">
          <img class="amazon-logo" src="images/amazon-logo-white.png" />
          <img
            class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png"
          />
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search" />

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="history.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png" />
          <div class="cart-quantity js-cart-quantity">${calculateTotalCartQuantity()}</div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
    </div>
    `

  document.querySelector(".js-amazon-header-container").innerHTML =
    amazonHeaderHTML
}

function displayProductsHTML() {
  let productsHTML = ""
  products.forEach(product => {
    productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                        src="${product.image}">
                </div>
    
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
    
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                        src="images/ratings/rating-${
                          product.rating.stars * 10
                        }.png">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>
    
                <div class="product-price">
                    $${formatCurrency(product.priceCents)}
                </div>
    
                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${product.id}">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
    
                <div class="product-spacer"></div>
    
                <div class="added-to-cart js-added-to-cart-${product.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
    
                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
                  product.id
                }">
                    Add to Cart
                </button>
            </div>
        `
  })
  document.querySelector(`.js-products-grid`).innerHTML = productsHTML

  document.querySelectorAll(`.js-add-to-cart`).forEach(button => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset
      addToCart(productId, null)
      //   refreshCartQuantity()
      renderAmazonHeader()
      popupAddedMessage(productId)
    })
  })
}

function popupAddedMessage(productId) {
  const addedToCartEl = document.querySelector(`.js-added-to-cart-${productId}`)
  const previousTimeoutId = addedToCartTimeouts[productId]
  addedToCartEl.classList.add("opaque")
  if (previousTimeoutId) {
    clearTimeout(previousTimeoutId)
  }
  const timeoutId = setTimeout(() => {
    addedToCartEl.classList.remove("opaque")
  }, 2000)
  addedToCartTimeouts[productId] = timeoutId
}
