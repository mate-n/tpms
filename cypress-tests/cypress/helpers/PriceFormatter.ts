export class PriceFormatter {
  formatPrice(price: number) {
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 })
  }

  formatPriceString(priceString: string) {
    const price = parseFloat(priceString)
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 })
  }
}
