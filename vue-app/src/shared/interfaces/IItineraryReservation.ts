import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IReservation } from './IReservation'
import type { IProtelCamp } from './protel/IProtelCamp'
import type { IProtelPark } from './protel/IProtelPark'
import type { IProtelRegion } from './protel/IProtelRegion'

export interface IItineraryReservation extends IEntityWithIdentity {
  reservations: IReservation[]
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
