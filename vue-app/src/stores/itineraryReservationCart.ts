import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { defineStore } from 'pinia'

export const useItineraryReservationCartStore = defineStore('itineraryReservationCart', {
  state: (): IItineraryReservationState => ({
    itineraryReservation: undefined
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
    }
  }
})

interface IItineraryReservationState {
  itineraryReservation: undefined | IItineraryReservation
}
