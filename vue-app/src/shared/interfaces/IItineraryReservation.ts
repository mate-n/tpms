import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IProtelCamp } from './protel/IProtelCamp'
import type { IProtelPark } from './protel/IProtelPark'
import type { IProtelRegion } from './protel/IProtelRegion'

export interface IItineraryReservation extends IEntityWithIdentity {
  startPropertyName: string
  endPropertyName: string
  arrivalDate: Date
  departureDate: Date
  selectedRegions: IProtelRegion[]
  selectedParks: IProtelPark[]
  selectedCamps: IProtelCamp[]
  selectedRoomTypeCodes: string[]
  guestProfileID: number | undefined
  protelReservations: IProtelReservation[]
}
