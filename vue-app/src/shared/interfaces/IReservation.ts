import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IPropertyAvailability } from './availability/IPropertyAvailability'

export interface IReservation extends IEntityWithIdentity {
  propertyID: number | undefined
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  roomID: number | undefined
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
