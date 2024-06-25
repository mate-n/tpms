export class PriceFormatter {
  formatPrice(price: number) {
    return price.toLocaleString(undefined, { minimumFractionDigits: 2 })
  }
}
