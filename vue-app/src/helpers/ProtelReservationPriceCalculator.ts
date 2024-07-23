import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { DateHelper } from './DateHelper'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ConservationFeePricesHelper } from './ConservationFeePricesHelper'

export class ProtelReservationPriceCalculator {
  dateHelper = new DateHelper()
  conservationFeePricesHelper = new ConservationFeePricesHelper()
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

  getPriceForAllNightsWithTicketsWithConservationFees(reservation: IProtelReservation) {
    const priceForAllNightsWithTickets =
      this.getPriceForAllNights(reservation) +
      reservation.tickets.reduce((acc, ticket) => acc + ticket.Price, 0)

    return (
      priceForAllNightsWithTickets +
      this.conservationFeePricesHelper.getTotalPrice(reservation.conservationFeePrices)
    )
  }

  getPriceForAllNightsWithTicketsForAllReservations(reservations: IProtelReservation[]) {
    const priceForAllNightsWithTickets = reservations.reduce(
      (acc, reservation) => acc + this.getPriceForAllNightsWithTickets(reservation),
      0
    )

    return priceForAllNightsWithTickets
  }

  getTotalPriceOfItineraryReservation(itineraryReservation: IItineraryReservation) {
    let total = 0
    if (itineraryReservation) {
      for (const reservation of itineraryReservation.protelReservations) {
        total += this.getPriceForAllNightsWithTicketsWithConservationFees(reservation)
      }
    }

    return total
  }
}
