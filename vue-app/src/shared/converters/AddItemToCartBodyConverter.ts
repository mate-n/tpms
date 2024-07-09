import { DateFormatter } from '@/helpers/DateFormatter'
import { AddItemToCartBody } from '../classes/AddItemToCartBody'
import type { IAddItemToCartBody } from '../interfaces/cart/IAddItemToCartBody'
import type { IReservation } from '../interfaces/IReservation'

export class AddItemToCartBodyConverter {
  dateFormater = new DateFormatter()

  convert(reservation: IReservation): IAddItemToCartBody {
    const addItemToCartBody: IAddItemToCartBody = new AddItemToCartBody()
    addItemToCartBody.arrival_date = this.dateFormater.yyyydashmmdashdd(reservation.arrivalDate)
    addItemToCartBody.departure_date = this.dateFormater.yyyydashmmdashdd(reservation.departureDate)
    addItemToCartBody.adults = reservation.guestsPerRoom.numberOfAdults
    addItemToCartBody.children = reservation.guestsPerRoom.numberOfChildren
    addItemToCartBody.units = reservation.numberOfRooms
    return addItemToCartBody
  }
}
