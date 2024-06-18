import { faker } from '@faker-js/faker'
import type { IReservation } from '../interfaces/IReservation'
import { Reservation } from '../classes/Reservation'

export class ReservationFaker {
  create(): IReservation {
    const reservation = new Reservation()
    reservation.id = faker.number.int()
    reservation.propertyID = faker.number.int()
    reservation.arrivalDate = faker.date.recent()
    reservation.departureDate = faker.date.future()
    reservation.numberOfRooms = faker.number.int()
    reservation.roomID = faker.number.int()
    reservation.profileID = faker.number.int()
    reservation.baseRateCategory = faker.lorem.word()
    reservation.guestName = faker.person.fullName()
    reservation.guestProfileID = faker.number.int()
    reservation.companyProfileID = faker.number.int()
    reservation.sourceProfileID = faker.number.int()
    reservation.travelAgentProfileID = faker.number.int()
    reservation.bookerProfileID = faker.number.int()
    reservation.orderIndex = faker.number.int()
    reservation.propertyName = faker.location.city()
    reservation.protelAvailabilities = []
    reservation.propertyAvailabilities = []
    return reservation
  }
}
