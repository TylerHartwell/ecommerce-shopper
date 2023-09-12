export let orders = JSON.parse(localStorage.getItem('orders'))
import { formatCurrency } from '../scripts/utils/money.js';

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
      datePlaced: new Date().toJSON().slice(0, 10),
      dateArrival: "2023-12-25"
    }
  )
  saveToStorage()
}

function generateOrderID(){
  return crypto.randomUUID();
}

