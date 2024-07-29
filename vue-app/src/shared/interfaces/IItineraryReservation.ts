import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IProtelCamp } from './protel/IProtelCamp'
import type { IProtelPark } from './protel/IProtelPark'
import type { IProtelRegion } from './protel/IProtelRegion'

export interface IItineraryReservation extends IEntityWithIdentity {
  protelReservations: IProtelReservation[]
  startPropertyName: string
  endPropertyName: string
  id?: number
  arrivalDate: Date
  departureDate: Date
  roomTypeCode: string | undefined
  selectedRoomTypeCodes: string[]
  selectedRegions: IProtelRegion[]
  selectedParks: IProtelPark[]
  selectedCamps: IProtelCamp[]
  guestProfileID: number | undefined
  cart_number: string
}
