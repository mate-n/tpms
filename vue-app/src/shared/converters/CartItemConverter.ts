import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { ICartItem } from '../interfaces/cart/ICartItem'
import { ProtelReservation } from '../classes/ProtelReservation'
import { GuestsPerRoom } from '../classes/GuestsPerRoom'
import { CampService } from '@/services/backend-middleware/CampService'
import { Rate } from '../classes/Rate'
import { RoomHelper } from '@/helpers/RoomHelper'
import { DateHelper } from '@/helpers/DateHelper'

export class CartItemConverter {
  campService = new CampService(undefined)
  roomHelper = new RoomHelper()
  dateHelper = new DateHelper()
  constructor(campServiceInput: CampService) {
    this.campService = campServiceInput
  }

  isProtelReservationOverlapping(
    checkingProtelReservation: IProtelReservation,
    protelReservations: IProtelReservation[]
  ): Boolean {
    return protelReservations.some(({ arrivalDate, departureDate }) => {
      if (!this.dateHelper.isAfter(checkingProtelReservation.arrivalDate, departureDate)) {
        return true
      }
      if (!this.dateHelper.isAfter(arrivalDate, checkingProtelReservation.departureDate)) {
        return true
      }
      return false
    })
  }

  convertToProtelReservation(
    cartItem: ICartItem,
    protelReservations: IProtelReservation[]
  ): Promise<IProtelReservation> {
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

        // convert this "protelReservation" to a "clone protelReservation" when it is overlapping another one
        if (this.isProtelReservationOverlapping(protelReservation, protelReservations)) {
          protelReservation.roomTypeCode = this.roomHelper.generateCloneRoomTypeCode(
            protelReservation.roomTypeCode
          )
        }

        resolve(protelReservation)
      })
    })
  }

  convertToProtelReservations(cartItems: ICartItem[]): Promise<IProtelReservation[]> {
    return new Promise((resolve) => {
      const protelReservations: IProtelReservation[] = []
      const promises = cartItems.map((cartItem) => {
        const cartItemData: ICartItem = { ...cartItem }

        // TODO: remove these lines of code
        // Because: `/cart/retrieve` return "cart_items" with "unit_id" value is "0", "1",...
        // set "unit_id" by subling's "unit_id" when it is a string of number
        if (!isNaN(Number(cartItem?.unit_id))) {
          const validUnitId = cartItems.find((item) => isNaN(Number(item?.unit_id)))?.unit_id
          if (validUnitId) {
            cartItemData.unit_id = validUnitId
          }
        }

        return this.convertToProtelReservation(cartItemData, protelReservations).then(
          (protelReservation) => {
            protelReservations.push(protelReservation)
          }
        )
      })
      Promise.all(promises).then(() => {
        resolve(protelReservations)
      })
    })
  }
}
