export class CartHelper {
  setCartNumber(cart_number: string) {
    localStorage.setItem('cart_number', cart_number)
  }

  getCartNumber() {
    return localStorage.getItem('cart_number')
  }
}
