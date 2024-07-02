import type { IEntityWithErrors } from './IEntityWithErrors'
import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IEntityWithProfile } from './IEntityWithProfile'
import type { IEntityWithTickets } from './IEntityWithTickets'
import type { IGuestsPerRoom } from './IGuestsPerRoom'
import type { ITicket } from './ITicket'
import type { IPropertyAvailability } from './availability/IPropertyAvailability'
import type { IProtelAvailability } from './protel/IProtelAvailability'
import type { IProtelAvailabilityGroup } from './protel/IProtelAvailabilityGroup'

export interface IReservation
  extends IEntityWithIdentity,
    IEntityWithErrors,
    IEntityWithTickets,
    IEntityWithProfile {
  propertyID: number | undefined
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  roomID: number | undefined
  profileID: number | undefined
  guestProfileID: number | undefined
  companyProfileID: number | undefined
  sourceProfileID: number | undefined
  travelAgentProfileID: number | undefined
  bookerProfileID: number | undefined
  baseRateCategory: string
  orderIndex: number
  propertyAvailabilities: IPropertyAvailability[]
  protelAvailabilities: IProtelAvailability[]
  selectedProtelAvailabilityGroups: IProtelAvailabilityGroup[]
  issues: string[]
  isBookerGuest: boolean
  ticketIDs: number[]
  tickets: ITicket[]
  totalRate: number
  averageRate: number
  propertyName: string
  guestsPerRoom: IGuestsPerRoom
  reset(): void
  resetInItineraryReservation(): void
  addIssue(issue: string): void
  removeIssue(issue: string): void
}
