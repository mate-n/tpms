import type { IItineraryReservation } from '../interfaces/IItineraryReservation'
import type { IReservation } from '../interfaces/IReservation'

export class ItineraryReservation implements IItineraryReservation {
  reservations: IReservation[]
  id?: number

  constructor() {
    this.reservations = []
  }
}
