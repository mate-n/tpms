import type { IItineraryReservation } from '../interfaces/IItineraryReservation'
import type { IReservation } from '../interfaces/IReservation'

export class ItineraryReservation implements IItineraryReservation {
  reservations: IReservation[]
  startDate: Date
  endDate: Date
  startPropertyName: string
  endPropertyName: string
  id?: number

  constructor() {
    this.reservations = []
    this.startDate = new Date()
    this.endDate = new Date()
    this.startPropertyName = ''
    this.endPropertyName = ''
  }
}
