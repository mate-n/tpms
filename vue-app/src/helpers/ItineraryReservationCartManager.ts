import type { CartService } from '@/services/backend-middleware/CartService'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { AddItemToCartBody } from '@/shared/classes/AddItemToCartBody'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
import { DateFormatter } from './DateFormatter'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'

export class ItineraryReservationCartManager {
  dateFormatter = new DateFormatter()
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

  addItemsToCart(reservations: IProtelReservation[], cartNumber: string, cartService: CartService) {
    return new Promise((resolve) => {
      const addItemToCartPromises: Promise<void>[] = []
      for (const reservation of reservations) {
        const newItem: IAddItemToCartBody = new AddItemToCartBody()
        newItem.action = 'add'
        newItem.cart_id = cartNumber
        newItem.arrival_date = this.dateFormatter.yyyydashmmdashdd(reservation.arrivalDate)
        newItem.departure_date = this.dateFormatter.yyyydashmmdashdd(reservation.departureDate)
        newItem.adults = 1
        newItem.children = 0
        newItem.units = reservation.numberOfRooms
        newItem.item_type = 1
        newItem.pricing.base_pricing = parseInt(reservation.rate.value)
        if (reservation.roomTypeCode) {
          newItem.type_code = reservation.roomTypeCode
        }
        if (reservation.property_code) {
          newItem.property_code = parseInt(reservation.property_code)
        }
        addItemToCartPromises.push(cartService.addItemToCart(newItem))
      }

      Promise.all(addItemToCartPromises).then((responses) => {
        resolve(responses)
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
