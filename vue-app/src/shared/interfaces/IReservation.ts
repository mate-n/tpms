import type { IEntityWithErrors } from './IEntityWithErrors'
import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IPropertyAvailability } from './availability/IPropertyAvailability'

export interface IReservation extends IEntityWithIdentity, IEntityWithErrors {
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
  isBookerGuest: boolean
  reset(): void
  addIssue(issue: string): void
  removeIssue(issue: string): void
}
