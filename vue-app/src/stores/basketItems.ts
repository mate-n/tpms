import { IdentityHelper } from '@/helpers/IdentityHelper'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { defineStore } from 'pinia'
const identityHelper = new IdentityHelper()

export const useBasketItemsStore = defineStore('basketItems', {
  state: () => ({ reservations: [] as IReservation[] }),
  actions: {
    addReservations(reservations: IReservation[]) {
      this.reservations = []
      this.reservations.push(...reservations)
    },
    addReservation(reservation: IReservation) {
      if (!this.searchReservation(reservation)) {
        this.reservations.push(reservation)
      }
    },
    removeReservation(reservation: IReservation) {
      this.reservations = this.reservations.filter(
        (reservationInBasket) => !identityHelper.isSame(reservationInBasket, reservation)
      )
    },
    searchReservation(reservation: IReservation) {
      return identityHelper.findByIdOrLocalID(
        this.reservations,
        reservation.id,
        reservation.localID
      )
    }
  }
})
