import type { IReservation } from '@/shared/interfaces/IReservation'
import { TicketHelper } from './TicketHelper'
import { DateHelper } from './DateHelper'

export class ReservationHelper {
  dateHelper = new DateHelper()
  ticketHelper = new TicketHelper()
  isReservationFirstOrLastOfArray(reservation: IReservation, reservations: IReservation[]) {
    const reservationWithLowestOrderIndex = reservations.reduce(
      (acc, curr) => (curr.orderIndex < acc.orderIndex ? curr : acc),
      reservations[0] || undefined
    )
    if (reservationWithLowestOrderIndex?.orderIndex === reservation.orderIndex) return true
    const reservationWithHighestOrderIndex = reservations.reduce(
      (acc, curr) => (curr.orderIndex > acc.orderIndex ? curr : acc),
      reservations[0] || undefined
    )
    if (reservationWithHighestOrderIndex?.orderIndex === reservation.orderIndex) return true
    return false
  }

  getNumberOfNights(reservation: IReservation): number {
    let numberOfNights = 0
    numberOfNights = this.dateHelper.calculateNightsBetweenDates(
      reservation.arrivalDate,
      reservation.departureDate
    )
    return numberOfNights
  }

  calculateTotalRate(reservation: IReservation): number {
    const numberOfNights = this.getNumberOfNights(reservation)
    let roomRate = 0
    if (reservation.selectedProtelAvailability) {
      roomRate = parseFloat(reservation.selectedProtelAvailability.rates_data[0].room_rate)
    }

    return roomRate * numberOfNights
  }

  calculateTotalReservationPrice(reservation: IReservation): number {
    let totalReservationPrice = 0
    totalReservationPrice += this.calculateTotalRate(reservation)
    totalReservationPrice += this.ticketHelper.getTotalPrice(reservation.tickets)
    return totalReservationPrice
  }

  getRoomRate(reservation: IReservation): number {
    let roomRate = 0
    if (reservation.selectedProtelAvailability) {
      roomRate = parseFloat(reservation.selectedProtelAvailability.rates_data[0].room_rate)
    }
    return roomRate
  }

  getTotalPrice(reservations: IReservation[]): number {
    let total = 0
    for (const reservation of reservations) {
      const roomRate = this.calculateTotalRate(reservation)
      total += roomRate + this.ticketHelper.getTotalPrice(reservation.tickets)
    }
    return total
  }
}
