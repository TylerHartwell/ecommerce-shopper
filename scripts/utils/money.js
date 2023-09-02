const shippingCostCentsHigh = 999
const shippingCostCentsMedium = 499
const shippingCostCentsLow = 0
const taxRate = 0.0725


export function formatTaxToPercentValue(){
  return (taxRate * 100).toFixed(2)
}

export function formatCurrency(priceCents){
  return (priceCents/100).toFixed(2)
}

export function calculateShippingCost(shippingPriority){
  if(shippingPriority === "high") return shippingCostCentsHigh
  if(shippingPriority === "medium") return shippingCostCentsMedium
  return shippingCostCentsLow
}

export function calculateTotalBeforeTax(subtotal, shippingTotal){
  const totalBeforeTax = subtotal + shippingTotal
  return totalBeforeTax
}

export function calculateTax(totalBeforeTax){
  return totalBeforeTax * taxRate
}

export function calculateOrderTotal(totalBeforeTax){
  return totalBeforeTax + calculateTax(totalBeforeTax)
}