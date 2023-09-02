const shippingCostCentsHigh = 999
const shippingCostCentsMedium = 499
const shippingCostCentsLow = 0


export function formatCurrency(priceCents){
  return (priceCents/100).toFixed(2)
}

export function calculateShippingCost(shippingPriority){
  if(shippingPriority === "high") return shippingCostCentsHigh
  if(shippingPriority === "medium") return shippingCostCentsMedium
  return shippingCostCentsLow
}

export function calculateTotalBeforeTax(subtotal, shippingTotal){
  const totalPreTax = subtotal + shippingTotal
  return totalPreTax
}