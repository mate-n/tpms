import { CampService } from '@/services/backend-middleware/CampService'
import { ItineraryReservation } from '../classes/ItineraryReservation'
import type { IRetrieveCartResponseBody } from '../interfaces/cart/IRetrieveCartResponseBody'
import type { IItineraryReservation } from '../interfaces/IItineraryReservation'
import { CartItemConverter } from './CartItemConverter'

export class CartConverter {
  campService = new CampService(undefined)
  cartItemConverter = new CartItemConverter(this.campService)

  constructor(campServiceInput: CampService) {
    this.campService = campServiceInput
    this.cartItemConverter = new CartItemConverter(this.campService)
  }

  convertToItineraryReservation(body: IRetrieveCartResponseBody): Promise<IItineraryReservation> {
    return new Promise((resolve) => {
      this.cartItemConverter
        .convertToProtelReservations(body.cart_items)
        .then((protelReservations) => {
          const itineraryReservation: IItineraryReservation = new ItineraryReservation()
          itineraryReservation.cart_number = body.cart.unique_number
          itineraryReservation.id = body.cart.cart_id
          itineraryReservation.guestProfileID = body.cart.profile_number
          itineraryReservation.protelReservations = protelReservations
          resolve(itineraryReservation)
        })
    })
  }
}
