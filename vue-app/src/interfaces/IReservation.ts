import type { IProperty } from './IProperty'
import type { IRoom } from './IRoom'
import type { IAvailabilityData } from './availability/IAvailabilityData'

export interface IReservation {
  id: number
  property: IProperty | undefined
  arrivalDate: Date
  departureDate: Date
  rooms: number
  room: IRoom | undefined
  guestsPerRoom: number
  guest: string
  baseRateCategory: string
  orderIndex: number
  availablityData: IAvailabilityData[]
  issues: string[]
  errors: Record<string, string>
  reset(): void
  addIssue(issue: string): void
  removeIssue(issue: string): void
}
