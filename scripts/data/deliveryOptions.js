export const deliveryOptions = [
  {
    priority: "low",
    deliveryDays: 7,
    priceCents: 0
  },
  {
    priority: "medium",
    deliveryDays: 3,
    priceCents: 499
  },
  {
    priority: "high",
    deliveryDays: 1,
    priceCents: 999
  }
]

export function getDeliveryOption(deliveryOptionPriority) {
  return deliveryOptions.find(
    option => option.priority === deliveryOptionPriority
  )
}
