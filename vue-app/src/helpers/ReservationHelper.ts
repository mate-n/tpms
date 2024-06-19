import type { IReservation } from '@/shared/interfaces/IReservation'
import { TicketHelper } from './TicketHelper'
import { DateHelper } from './DateHelper'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'

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
    let roomRate = 0

    for (const protelAvailability of reservation.selectedProtelAvailabilities) {
      roomRate += parseFloat(protelAvailability.rates_data[0].room_rate)
    }

    return roomRate
  }

  calculateTotalReservationPrice(reservation: IReservation): number {
    let totalReservationPrice = 0
    totalReservationPrice += this.calculateTotalRate(reservation)
    totalReservationPrice += this.ticketHelper.getTotalPrice(reservation.tickets)
    return totalReservationPrice
  }

  getRoomRate(reservation: IReservation): number {
    let roomRate = 0
    for (const protelAvailability of reservation.protelAvailabilities) {
      roomRate += parseFloat(protelAvailability.rates_data[0].room_rate)
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

  getAverageRoomRate(availabilities: IProtelAvailability[]): number {
    let total = 0
    for (const availability of availabilities) {
      total += parseFloat(availability.rates_data[0].room_rate)
    }
    return total / availabilities.length
  }
}
