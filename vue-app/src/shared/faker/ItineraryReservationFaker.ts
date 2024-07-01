import { faker } from '@faker-js/faker'
import type { IItineraryReservation } from '../interfaces/IItineraryReservation'
import { ItineraryReservation } from '../classes/ItineraryReservation'
import { ReservationFaker } from './ReservationFaker'

export class ItineraryReservationFaker {
  reservationFaker = new ReservationFaker()
  create(): IItineraryReservation {
    const itineraryReservation = new ItineraryReservation()
    itineraryReservation.id = faker.number.int()
    itineraryReservation.arrivalDate = faker.date.recent()
    itineraryReservation.departureDate = faker.date.future()
    itineraryReservation.startPropertyName = faker.location.city()
    itineraryReservation.endPropertyName = faker.location.city()
    const reservation1 = this.reservationFaker.create()
    const reservation2 = this.reservationFaker.create()
    const reservation3 = this.reservationFaker.create()
    itineraryReservation.reservations.push(reservation1)
    itineraryReservation.reservations.push(reservation2)
    itineraryReservation.reservations.push(reservation3)
    return itineraryReservation
  }
}
