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
    return itineraryReservation
  }
}
