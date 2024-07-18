import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { DateHelper } from './DateHelper'

export class ProtelReservationPriceCalculator {
  dateHelper = new DateHelper()
  getPriceForAllNights(reservation: IProtelReservation) {
    const numberOfNights = this.dateHelper.calculateNightsBetweenDates(
      reservation.arrivalDate,
      reservation.departureDate
    )
    return parseInt(reservation.rate.value) * numberOfNights * reservation.numberOfRooms
  }

  getAveragePricePerNight(reservation: IProtelReservation) {
    return parseInt(reservation.rate.value)
  }

  getPriceForAllNightsWithTickets(reservation: IProtelReservation) {
    return (
      this.getPriceForAllNights(reservation) +
      reservation.tickets.reduce((acc, ticket) => acc + ticket.Price, 0)
    )
  }

  getPriceForAllNightsWithTicketsForAllReservations(reservations: IProtelReservation[]) {
    return reservations.reduce(
      (acc, reservation) => acc + this.getPriceForAllNightsWithTickets(reservation),
      0
    )
  }
}
