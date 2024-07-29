import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { ICartItem } from '../interfaces/cart/ICartItem'
import { ProtelReservation } from '../classes/ProtelReservation'
import { GuestsPerRoom } from '../classes/GuestsPerRoom'
import { CampService } from '@/services/backend-middleware/CampService'
import { Rate } from '../classes/Rate'

export class CartItemConverter {
  campService = new CampService(undefined)
  constructor(campServiceInput: CampService) {
    this.campService = campServiceInput
  }
  convertToProtelReservation(cartItem: ICartItem): Promise<IProtelReservation> {
    return new Promise((resolve) => {
      this.campService.findAll().then((camps) => {
        const camp = camps.find((camp) => camp.id == cartItem.camp_id)
        const protelReservation: IProtelReservation = new ProtelReservation()
        protelReservation.cartITemID = cartItem.id
        protelReservation.id = parseInt(cartItem.confirmation)
        protelReservation.arrivalDate = new Date(cartItem.arrival_date)
        protelReservation.departureDate = new Date(cartItem.departure_date)
        protelReservation.numberOfRooms = cartItem.units
        protelReservation.guestsPerRoom = new GuestsPerRoom()
        protelReservation.guestsPerRoom.numberOfAdults = cartItem.adults
        protelReservation.guestsPerRoom.numberOfChildren = cartItem.children
        protelReservation.roomTypeCode = cartItem.unit_id
        protelReservation.property_code = cartItem.camp_id.toString()
        protelReservation.rate = new Rate()
        protelReservation.rate.value = cartItem.base_pricing
        if (camp) {
          protelReservation.property_name = camp.name
        }
        resolve(protelReservation)
      })
    })
  }

  convertToProtelReservations(cartItems: ICartItem[]): Promise<IProtelReservation[]> {
    return new Promise((resolve) => {
      const protelReservations: IProtelReservation[] = []
      const promises = cartItems.map((cartItem) => {
        return this.convertToProtelReservation(cartItem).then((protelReservation) => {
          protelReservations.push(protelReservation)
        })
      })
      Promise.all(promises).then(() => {
        resolve(protelReservations)
      })
    })
  }
}
