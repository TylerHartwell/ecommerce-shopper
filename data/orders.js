export let orders = JSON.parse(localStorage.getItem('orders'))
import { v4 as uuidv4 } from 'uuid';


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
      orderId: new Date().toLocaleDateString(),
      total: 0,
      datePlaced: Date.now(),
      dateArrival: "December 25"
    }
  )
  saveToStorage()
}

function generateOrderID(){
  return uuidv4();
}
