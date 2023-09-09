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
  orders.push(
    {
      cart,
      orderId: generateOrderID(),
      total: `${formatCurrency(0)}`,
      datePlaced: new Date().toJSON().slice(0, 10),
      dateArrival: "2023-12-25"
    }
  )
  saveToStorage()
}

function generateOrderID(){
  return crypto.randomUUID();
}

