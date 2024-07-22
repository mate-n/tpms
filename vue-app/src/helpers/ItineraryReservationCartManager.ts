import type { CartService } from '@/services/backend-middleware/CartService'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { AddItemToCartBody } from '@/shared/classes/AddItemToCartBody'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
import { DateFormatter } from './DateFormatter'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'
import type { IUpdateItemInCartBody } from '@/shared/interfaces/cart/IUpdateItemInCartBody'
import { UpdateItemInCartBody } from '@/shared/classes/UpdateItemInCartBody'
import type { IConservationFeePrice } from '@/shared/interfaces/IConservationFeePrices'

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
        addItemToCartPromises.push(
          this.addITemToCartAndAssignCartITemIDAndID(reservation, newItem, cartService)
        )
      }

      Promise.all(addItemToCartPromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  addTicketsToCart(
    reservations: IProtelReservation[],
    cartNumber: string,
    cartService: CartService
  ) {
    return new Promise((resolve) => {
      const addItemToCartPromises: Promise<void>[] = []
      for (const reservation of reservations) {
        for (const ticket of reservation.tickets) {
          const newItem: IAddItemToCartBody = new AddItemToCartBody()
          newItem.action = 'add'
          newItem.cart_id = cartNumber
          newItem.arrival_date = this.dateFormatter.yyyydashmmdashdd(ticket.Date)
          newItem.departure_date = this.dateFormatter.yyyydashmmdashdd(ticket.Date)
          newItem.adults = 1
          newItem.children = 0
          newItem.units = reservation.numberOfRooms
          newItem.item_type = 1
          newItem.pricing.base_pricing = parseInt(reservation.rate.value)
          newItem.type_code = ticket.TicketId

          if (reservation.property_code) {
            newItem.property_code = parseInt(reservation.property_code)
          }
          addItemToCartPromises.push(
            this.addITemToCartAndAssignCartITemIDAndID(reservation, newItem, cartService)
          )
        }
      }

      Promise.all(addItemToCartPromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  convertConservationFeePriceToAddItemToCartBody(
    reservation: IProtelReservation,
    conservationFeePrice: IConservationFeePrice,
    cartNumber: string
  ) {
    const addItemToCartBody: IAddItemToCartBody = new AddItemToCartBody()
    addItemToCartBody.action = 'add'
    addItemToCartBody.cart_id = cartNumber
    addItemToCartBody.arrival_date = this.dateFormatter.yyyydashmmdashdd(reservation.arrivalDate)
    addItemToCartBody.departure_date = this.dateFormatter.yyyydashmmdashdd(
      reservation.departureDate
    )
    addItemToCartBody.units = conservationFeePrice.count
    addItemToCartBody.type_code = conservationFeePrice.plankton_ticket
    addItemToCartBody.property_code = parseInt(reservation.property_code)
    addItemToCartBody.item_type = 2

    return addItemToCartBody
  }

  addConservationFeesToCart(
    reservations: IProtelReservation[],
    cartNumber: string,
    cartService: CartService
  ) {
    return new Promise((resolve) => {
      const addConservationFeesToCartPromises: Promise<void>[] = []
      for (const reservation of reservations) {
        const adult_int_body = this.convertConservationFeePriceToAddItemToCartBody(
          reservation,
          reservation.conservationFeePrices.adult_int,
          cartNumber
        )
        const child_int_body = this.convertConservationFeePriceToAddItemToCartBody(
          reservation,
          reservation.conservationFeePrices.child_int,
          cartNumber
        )
        const adult_sa_body = this.convertConservationFeePriceToAddItemToCartBody(
          reservation,
          reservation.conservationFeePrices.adult_sa,
          cartNumber
        )
        const child_sa_body = this.convertConservationFeePriceToAddItemToCartBody(
          reservation,
          reservation.conservationFeePrices.child_sa,
          cartNumber
        )
        const adult_sadc_body = this.convertConservationFeePriceToAddItemToCartBody(
          reservation,
          reservation.conservationFeePrices.adult_sadc,
          cartNumber
        )
        const child_sadc_body = this.convertConservationFeePriceToAddItemToCartBody(
          reservation,
          reservation.conservationFeePrices.child_sadc,
          cartNumber
        )

        if (adult_int_body.units > 0) {
          addConservationFeesToCartPromises.push(cartService.addItemToCart(adult_int_body))
        }

        if (child_int_body.units > 0) {
          addConservationFeesToCartPromises.push(cartService.addItemToCart(child_int_body))
        }

        if (adult_sa_body.units > 0) {
          addConservationFeesToCartPromises.push(cartService.addItemToCart(adult_sa_body))
        }

        if (child_sa_body.units > 0) {
          addConservationFeesToCartPromises.push(cartService.addItemToCart(child_sa_body))
        }

        if (adult_sadc_body.units > 0) {
          addConservationFeesToCartPromises.push(cartService.addItemToCart(adult_sadc_body))
        }

        if (child_sadc_body.units > 0) {
          addConservationFeesToCartPromises.push(cartService.addItemToCart(child_sadc_body))
        }
      }

      Promise.all(addConservationFeesToCartPromises).then((responses) => {
        console.log('addConservationFeesToCartPromises', responses)
        resolve(responses)
      })
    })
  }

  updateItemsInCart(
    reservations: IProtelReservation[],
    cartNumber: string,
    cartService: CartService
  ) {
    return new Promise((resolve) => {
      const updateItemInCartPromises: Promise<void>[] = []
      for (const reservation of reservations) {
        const newItem: IUpdateItemInCartBody = new UpdateItemInCartBody()
        newItem.action = 'edit'
        newItem.cart_id = cartNumber
        if (reservation.cartITemID) {
          newItem.cart_item_id = reservation.cartITemID
        }
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
        updateItemInCartPromises.push(cartService.updateItemInCart(newItem))
      }

      Promise.all(updateItemInCartPromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  addITemToCartAndAssignCartITemIDAndID(
    reservation: IProtelReservation,
    addItemToCartBody: IAddItemToCartBody,
    cartService: CartService
  ) {
    return new Promise<any>((resolve) => {
      cartService.addItemToCart(addItemToCartBody).then((response) => {
        reservation.id = response.confirmation
        reservation.cartITemID = response.cart_item_id
        resolve(response)
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
