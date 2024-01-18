export let orders = JSON.parse(localStorage.getItem('orders'))

if(!orders) {
  orders = []
  saveToStorage()
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders))
}

export function addToOrders(cart){
  if(cart.length < 1) return
  orders.push(
    {
      cart,
      orderId: generateOrderID(),
      total: `${document.querySelector('.js-order-total').textContent}`,
      datePlaced: new Date().toJSON().slice(0, 10)
    }
  )
  saveToStorage()
}

function generateOrderID(){
  return crypto.randomUUID();
}

export function removeFromOrders(orderId) {
  orders = orders.filter(order => order.orderId !== orderId)
  saveToStorage()
}

