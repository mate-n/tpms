import type { CartService } from '@/services/backend-middleware/CartService'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
import { DateFormatter } from './DateFormatter'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'
import { SyncCartItemService } from '@/services/backend-middleware/SyncCartItemService'

export class ItineraryReservationCartManager {
  dateFormatter = new DateFormatter()
  syncCartItemService = new SyncCartItemService()
  createCart(profile_number: string, cartService: CartService) {
    return new Promise<CreateCartResponseBody>((resolve) => {
      const cartBody: ICartBody = {
        action: 'create',
        profile_number: profile_number,
        cart_type: 2
      }

      cartService.createCart(cartBody).then((createCartResponseBody: CreateCartResponseBody) => {
        resolve(createCartResponseBody)
      })
    })
  }

  updateCart(profile_number: string, cart_number: string, cartService: CartService) {
    return new Promise<CreateCartResponseBody>((resolve) => {
      const cartBody: IUpdateCartBody = {
        action: 'updateProfile',
        cart_number: cart_number,
        profile_number: profile_number
      }

      cartService.updateCart(cartBody).then((res) => {
        resolve(res)
      })
    })
  }

  settleCart(cartNumber: string, totalPrice: string, cartService: CartService) {
    return new Promise((resolve) => {
      const settleCartBody: ISettleCartBody = {
        action: 'updatePayment',
        cart_number: cartNumber,
        payment_ref: 'REF123456789',
        payment_amount: totalPrice,
        payment_method: 'AHSPAYMENTPROCESSOR',
        status: 'Confirmed'
      }

      cartService.settleCart(settleCartBody).then((res) => {
        resolve(res)
      })
    })
  }
}
