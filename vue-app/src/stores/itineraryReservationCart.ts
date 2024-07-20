import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { defineStore } from 'pinia'

export const useItineraryReservationCartStore = defineStore('itineraryReservationCart', {
  state: (): IItineraryReservationState => ({
    itineraryReservation: undefined,
    cartNumber: '',
    profileNumber: ''
  }),

  actions: {
    setItineraryReservation(itineraryReservation: IItineraryReservation) {
      this.itineraryReservation = itineraryReservation
    },
    getItineraryReservation(): IItineraryReservation | undefined {
      return this.itineraryReservation
    },
    clearItineraryReservation() {
      this.itineraryReservation = undefined
    },
    setCartNumber(cartNumber: string) {
      this.cartNumber = cartNumber
    },
    getCartNumber(): string {
      return this.cartNumber
    },
    setProfileNumber(profileNumber: string) {
      this.profileNumber = profileNumber
    },
    getProfileNumber(): string {
      return this.profileNumber
    }
  }
})

export interface IItineraryReservationState {
  itineraryReservation: undefined | IItineraryReservation
  cartNumber: string
  profileNumber: string
}
