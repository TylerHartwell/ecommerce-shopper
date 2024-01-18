const taxRate = 0.0725

export function formatTaxToPercentValue() {
  return (taxRate * 100).toFixed(2)
}

export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2)
}

export function calculateTotalBeforeTax(subtotal, shippingTotal) {
  return subtotal + shippingTotal
}

export function calculateTax(cents) {
  return cents * taxRate
}

export function calculateOrderTotal(totalBeforeTax) {
  return totalBeforeTax + calculateTax(totalBeforeTax)
}
