import type { IAvailability } from './IAvailability'

export interface IReservation {
  id: number
  camp: string
  arrivalDate: Date
  departureDate: Date
  rooms: number
  roomType: string
  guestsPerRoom: number
  guest: string
  baseRateCategory: string
  orderIndex: number
  availabilities: IAvailability[]
  issues: string[]
  reset(): void
}
