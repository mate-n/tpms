import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { DateHelper } from './DateHelper'
import { ItineraryReservationHelper } from './ItineraryReservationHelper'

export class ItineraryReservationMover {
  dateHelper = new DateHelper()
  itineraryReservationHelper = new ItineraryReservationHelper()
  move(itineraryReservation: IItineraryReservation, daysToMove: number) {
    itineraryReservation.protelReservations.forEach((reservation) => {
      reservation.arrivalDate = this.dateHelper.addDays(reservation.arrivalDate, daysToMove)
      reservation.departureDate = this.dateHelper.addDays(reservation.departureDate, daysToMove)
    })
  }

  extendFirstReservationsToAnEarlierDate(
    itineraryReservation: IItineraryReservation,
    daysToExtend: number
  ) {
    const startDate = this.itineraryReservationHelper.getStartDate(itineraryReservation)
    if (!startDate) {
      return
    }
    const firstReservations = itineraryReservation.protelReservations.filter((reservation) =>
      this.dateHelper.isSameDay(reservation.arrivalDate, startDate)
    )

    for (const reservation of firstReservations) {
      reservation.arrivalDate = this.dateHelper.addDays(reservation.arrivalDate, daysToExtend)
    }
  }

  extendLastReservationsToALaterDate(
    itineraryReservation: IItineraryReservation,
    daysToExtend: number
  ) {
    const endDate = this.itineraryReservationHelper.getEndDate(itineraryReservation)
    if (!endDate) {
      return
    }
    const lastReservations = itineraryReservation.protelReservations.filter((reservation) =>
      this.dateHelper.isSameDay(reservation.departureDate, endDate)
    )

    for (const reservation of lastReservations) {
      reservation.departureDate = this.dateHelper.addDays(reservation.departureDate, daysToExtend)
    }
  }
}
