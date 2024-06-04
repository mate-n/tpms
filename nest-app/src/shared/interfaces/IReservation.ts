import type { IEntityWithErrors } from './IEntityWithErrors'
import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { ITicket } from './ITicket'
import type { IPropertyAvailability } from './availability/IPropertyAvailability'

export interface IReservation extends IEntityWithIdentity, IEntityWithErrors {
  propertyID: number | undefined
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  roomID: number | undefined
  numberOfGuestsPerRoom: number
  profileID: number | undefined
  guestProfileID: number | undefined
  companyProfileID: number | undefined
  sourceProfileID: number | undefined
  travelAgentProfileID: number | undefined
  bookerProfileID: number | undefined
  baseRateCategory: string
  orderIndex: number
  propertyAvailabilities: IPropertyAvailability[]
  issues: string[]
  isBookerGuest: boolean
  ticketIDs: number[]
  tickets: ITicket[]
  totalRate: number
  averageRate: number
  guestName: string
  propertyName: string
  reset(): void
  addIssue(issue: string): void
  removeIssue(issue: string): void
}
