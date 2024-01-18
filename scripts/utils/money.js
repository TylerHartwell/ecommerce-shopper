const taxRate = 0.0725

export function formatTaxToPercentValue() {
  return (taxRate * 100).toFixed(2)
}

export function formatCurrency(priceCents) {
  return (priceCents / 100).toFixed(2)
}

export function calculateTotalBeforeTax(subtotal, shippingTotal) {
  const totalBeforeTax = subtotal + shippingTotal
  return totalBeforeTax
}

export function calculateTax(totalBeforeTax) {
  return totalBeforeTax * taxRate
}

export function calculateOrderTotal(totalBeforeTax) {
  return totalBeforeTax + calculateTax(totalBeforeTax)
}
