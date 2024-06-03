import type { IReservation } from '@/shared/interfaces/IReservation'
import { TicketHelper } from './TicketHelper'

export class ReservationHelper {
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

  getTotalPrice(reservations: IReservation[]): number {
    let total = 0
    for (const reservation of reservations) {
      total += reservation.totalRate + this.ticketHelper.getTotalPrice(reservation.tickets)
    }
    return total
  }
}
