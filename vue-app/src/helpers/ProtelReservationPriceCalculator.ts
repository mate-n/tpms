import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { DateHelper } from './DateHelper'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'

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

  getTotalPriceOfItineraryReservation(itineraryReservation: IItineraryReservation) {
    let total = 0
    if (itineraryReservation) {
      for (const reservation of itineraryReservation.protelReservations) {
        total += this.getPriceForAllNightsWithTickets(reservation)
      }
    }

    return total
  }
}
