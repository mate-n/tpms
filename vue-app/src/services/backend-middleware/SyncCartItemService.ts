import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IService } from '@/interfaces/IService'
import type { IProtelReservation } from '../reservations/IProtelReservation'
import { ItemCartBody } from '@/shared/classes/ItemCartBody'
import type { AxiosStatic } from 'axios'
import { CartItemService } from './CartItemService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { CartService } from './CartService'
import type { ICartItem } from '@/shared/interfaces/cart/ICartItem'
import type { IRemoveItemFromCartBody } from '@/shared/interfaces/cart/IRemoveItemFromCartBody'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import { AddItemToCartBody } from '@/shared/classes/AddItemToCartBody'
import type { IUpdateItemInCartBody } from '@/shared/interfaces/cart/IUpdateItemInCartBody'
import { UpdateItemInCartBody } from '@/shared/classes/UpdateItemInCartBody'
import type { IConservationFeePrice } from '@/shared/interfaces/IConservationFeePrices'

export class SyncCartItemService implements IService {
  axiosInstance: any
  dateFormatter = new DateFormatter()
  cartItemService = new CartItemService()
  cartService = new CartService(undefined)
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
    this.cartService = new CartService(axios)
  }

  synchronizeFrontendCartWithBackendCart(
    itineraryReservation: IItineraryReservation,
    cartNumber: string
  ) {
    return new Promise<any>((resolve) => {
      this.removeItemsThatOnlyExistInBackendCart(itineraryReservation, cartNumber)
        .then(() => this.addOrUpdateItemsToCart(itineraryReservation, cartNumber))
        .then((responses) => {
          resolve(responses)
        })
    })
  }

  addOrUpdateItemsToCart(itineraryReservation: IItineraryReservation, cartNumber: string) {
    return new Promise<any>((resolve) => {
      this.addOrUpdateReservationsToCart(itineraryReservation, cartNumber)
        .then(() => this.addTicketsToCart(itineraryReservation, cartNumber))
        .then(() =>
          this.addConservationFeesToCart(itineraryReservation.protelReservations, cartNumber)
        )
        .then(() => resolve(''))
    })
  }

  addOrUpdateReservationsToCart(itineraryReservation: IItineraryReservation, cartNumber: string) {
    return new Promise((resolve) => {
      const addOrUpdatePromises: Promise<void>[] = []

      const reservationsWithoutCartItemId = itineraryReservation.protelReservations.filter(
        (reservation) => !reservation.cartITemID
      )
      if (reservationsWithoutCartItemId) {
        addOrUpdatePromises.push(
          this.addReservationsToCart(reservationsWithoutCartItemId, cartNumber)
        )
      }

      const itemsWithCartItemId = itineraryReservation.protelReservations.filter(
        (reservation) => reservation.cartITemID
      )

      if (itemsWithCartItemId) {
        addOrUpdatePromises.push(this.updateReservationsInCart(itemsWithCartItemId, cartNumber))
      }

      Promise.all(addOrUpdatePromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  addReservationsToCart(reservations: IProtelReservation[], cartNumber: string) {
    return new Promise<any>((resolve) => {
      const addItemToCartPromises: Promise<void>[] = []
      for (const reservation of reservations) {
        const newItem: IAddItemToCartBody = new AddItemToCartBody()
        newItem.action = 'add'
        newItem.cart_id = cartNumber
        newItem.arrival_date = this.dateFormatter.yyyydashmmdashdd(reservation.arrivalDate)
        newItem.departure_date = this.dateFormatter.yyyydashmmdashdd(reservation.departureDate)
        newItem.adults = reservation.guestsPerRoom.numberOfAdults
        newItem.children = reservation.guestsPerRoom.numberOfChildren
        newItem.units = reservation.numberOfRooms
        newItem.item_type = 1
        newItem.pricing.base_pricing = parseInt(reservation.rate.value)
        if (reservation.roomTypeCode) {
          newItem.type_code = reservation.roomTypeCode
        }
        if (reservation.property_code) {
          newItem.property_code = parseInt(reservation.property_code)
        }
        addItemToCartPromises.push(this.addITemToCartAndAssignCartITemIDAndID(reservation, newItem))
      }

      Promise.all(addItemToCartPromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  updateReservationsInCart(reservations: IProtelReservation[], cartNumber: string) {
    return new Promise<any>((resolve) => {
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
        newItem.adults = reservation.guestsPerRoom.numberOfAdults
        newItem.children = reservation.guestsPerRoom.numberOfChildren
        newItem.units = reservation.numberOfRooms
        newItem.item_type = 1
        newItem.pricing.base_pricing = parseInt(reservation.rate.value)
        if (reservation.roomTypeCode) {
          newItem.type_code = reservation.roomTypeCode
        }
        if (reservation.property_code) {
          newItem.property_code = parseInt(reservation.property_code)
        }
        updateItemInCartPromises.push(this.cartService.updateItemInCart(newItem))
      }

      Promise.all(updateItemInCartPromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  addITemToCartAndAssignCartITemIDAndID(
    reservation: IProtelReservation,
    addItemToCartBody: IAddItemToCartBody
  ) {
    return new Promise<any>((resolve) => {
      this.cartService.addItemToCart(addItemToCartBody).then((response) => {
        reservation.id = response.confirmation
        reservation.cartITemID = response.cart_item_id
        resolve(response)
      })
    })
  }

  addTicketsToCart(itineraryReservation: IItineraryReservation, cartNumber: string) {
    return new Promise((resolve) => {
      const addItemToCartPromises: Promise<void>[] = []
      for (const reservation of itineraryReservation.protelReservations) {
        for (const ticket of reservation.tickets) {
          const newItem: IAddItemToCartBody = new AddItemToCartBody()
          newItem.action = 'add'
          newItem.cart_id = cartNumber
          newItem.arrival_date = this.dateFormatter.yyyydashmmdashdd(ticket.Date)
          newItem.departure_date = this.dateFormatter.yyyydashmmdashdd(ticket.Date)
          newItem.adults = 0
          newItem.children = 0
          newItem.units = reservation.numberOfRooms
          newItem.item_type = 1
          if (reservation.cartITemID) {
            newItem.parent = reservation.cartITemID
          }
          newItem.pricing.base_pricing = parseInt(reservation.rate.value)
          newItem.type_code = ticket.TicketId

          if (reservation.property_code) {
            newItem.property_code = parseInt(reservation.property_code)
          }
          addItemToCartPromises.push(
            this.cartService.addItemToCart(newItem)
            //this.addITemToCartAndAssignCartITemIDAndID(reservation, newItem, this.cartService)
          )
        }
      }

      Promise.all(addItemToCartPromises).then((responses) => {
        resolve(responses)
      })
    })
  }

  addConservationFeesToCart(reservations: IProtelReservation[], cartNumber: string) {
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
          addConservationFeesToCartPromises.push(this.cartService.addItemToCart(adult_int_body))
        }

        if (child_int_body.units > 0) {
          addConservationFeesToCartPromises.push(this.cartService.addItemToCart(child_int_body))
        }

        if (adult_sa_body.units > 0) {
          addConservationFeesToCartPromises.push(this.cartService.addItemToCart(adult_sa_body))
        }

        if (child_sa_body.units > 0) {
          addConservationFeesToCartPromises.push(this.cartService.addItemToCart(child_sa_body))
        }

        if (adult_sadc_body.units > 0) {
          addConservationFeesToCartPromises.push(this.cartService.addItemToCart(adult_sadc_body))
        }

        if (child_sadc_body.units > 0) {
          addConservationFeesToCartPromises.push(this.cartService.addItemToCart(child_sadc_body))
        }
      }

      Promise.all(addConservationFeesToCartPromises).then((responses) => {
        console.log('addConservationFeesToCartPromises', responses)
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
    if (reservation.cartITemID) {
      addItemToCartBody.parent = reservation.cartITemID
    }

    return addItemToCartBody
  }

  removeItemsThatOnlyExistInBackendCart(
    itineraryReservation: IItineraryReservation,
    cartNumber: string
  ) {
    return new Promise<any>((resolve) => {
      this.cartService
        .getItemsInCart({ cart_number: cartNumber })
        .then((backendCartItems: ICartItem[]) => {
          const removeItemsFromBackendPromises: Promise<any>[] = []
          const reservationsCartItemIDs = itineraryReservation.protelReservations.map(
            (reservation) => reservation.cartITemID
          )
          console.log('before', reservationsCartItemIDs)

          const activitiesCartItemIDs = itineraryReservation.protelReservations
            .map((reservation) => reservation.tickets.map((ticket) => ticket.cartITemID))
            .flat()

          const cartItemIDsInItineraryReservation = [
            ...reservationsCartItemIDs,
            ...activitiesCartItemIDs
          ]

          backendCartItems.forEach((backendCartItem) => {
            if (!cartItemIDsInItineraryReservation.includes(backendCartItem.id)) {
              console.log('Removing item from cart', backendCartItem.id)
              console.log('cartItemIDsInItineraryReservation', cartItemIDsInItineraryReservation)
              const removeItemFromCartBody: IRemoveItemFromCartBody = {
                action: 'delete',
                id: backendCartItem.id
              }
              removeItemsFromBackendPromises.push(
                this.cartService.removeItemFromCart(removeItemFromCartBody)
              )
            }
          })

          Promise.all(removeItemsFromBackendPromises).then((responses) => {
            resolve(responses)
          })
        })
    })
  }

  mapItemCartBody(
    reservation: IProtelReservation,
    cartId: string,
    itemData: Partial<ItemCartBody>
  ) {
    return new ItemCartBody({
      cart_id: cartId,
      cart_item_id: reservation.cartITemID || 0,
      arrival_date: this.dateFormatter.yyyydashmmdashdd(reservation.arrivalDate),
      departure_date: this.dateFormatter.yyyydashmmdashdd(reservation.departureDate),
      adults: 1,
      children: 0,
      units: reservation.numberOfRooms,
      item_type: 1,
      pricing: {
        base_pricing: parseInt(reservation.rate.value),
        discount_web: 0,
        community_levy: 0,
        conservation_fees: 0
      },
      type_code: reservation.roomTypeCode || '',
      property_code: reservation.property_code ? parseInt(reservation.property_code) : 0,
      ...itemData
    })
  }

  async syncItemToCart(
    action: 'add' | 'edit' | 'delete',
    reservation: IProtelReservation,
    itemData: Partial<Omit<ItemCartBody, 'action'>>,
    cartId: string
  ) {
    if (action === 'add') {
      const item = this.mapItemCartBody(reservation, cartId, itemData)
      const response = await this.cartItemService.addItemToCart(item)
      return response
    }

    if (action === 'edit') {
      const item = this.mapItemCartBody(reservation, cartId, itemData)
      const response = await this.cartItemService.updateItemInCart(item)
      return response
    }

    if (action === 'delete') {
      if (!reservation.cartITemID) throw Error('Missing "cartItemID"')
      const response = await this.cartItemService.removeItemFromCart(reservation.cartITemID)
      return response
    }
  }
}