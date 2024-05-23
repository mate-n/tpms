import type { IReservation } from '@/shared/interfaces/IReservation'

export class ReservationHelper {
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
}
