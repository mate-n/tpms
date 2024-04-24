import type { IProperty } from './IProperty'
import type { IRoom } from './IRoom'
import type { IPropertyAvailability } from './availability/IPropertyAvailability'

export interface IReservation {
  id: number
  property: IProperty | undefined
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  room: IRoom | undefined
  numberOfGuestsPerRoom: number
  profileID: number | undefined
  baseRateCategory: string
  orderIndex: number
  propertyAvailabilities: IPropertyAvailability[]
  issues: string[]
  errors: Record<string, string>
  reset(): void
  addIssue(issue: string): void
  removeIssue(issue: string): void
}
