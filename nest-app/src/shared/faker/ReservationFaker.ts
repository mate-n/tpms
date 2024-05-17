import { faker } from '@faker-js/faker'
import type { IReservation } from '../interfaces/IReservation'
import { Reservation } from '../classes/Reservation'

export class ReservationFaker {
  create(): IReservation {
    let reservation = new Reservation()
    reservation.id = faker.number.int()
    reservation.propertyID = faker.number.int()
    reservation.arrivalDate = faker.date.recent()
    reservation.departureDate = faker.date.future()
    reservation.numberOfRooms = faker.number.int()
    reservation.roomID = faker.number.int()
    reservation.numberOfGuestsPerRoom = faker.number.int()
    reservation.profileID = faker.number.int()
    reservation.baseRateCategory = faker.random.word()
    return reservation
  }
}
