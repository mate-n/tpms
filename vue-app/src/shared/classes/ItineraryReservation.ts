import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { DateHelper } from '../../helpers/DateHelper'
import type { IItineraryReservation } from '../interfaces/IItineraryReservation'
import type { IReservation } from '../interfaces/IReservation'
import type { IProtelCamp } from '../interfaces/protel/IProtelCamp'
import type { IProtelPark } from '../interfaces/protel/IProtelPark'
import type { IProtelRegion } from '../interfaces/protel/IProtelRegion'

export class ItineraryReservation implements IItineraryReservation {
  dateHelper: DateHelper = new DateHelper()
  protelReservations: IProtelReservation[]
  reservations: IReservation[]
  startPropertyName: string
  endPropertyName: string
  id?: number
  arrivalDate: Date
  departureDate: Date
  selectedRegions: IProtelRegion[]
  selectedParks: IProtelPark[]
  selectedCamps: IProtelCamp[]
  guestProfileID: number | undefined

  constructor() {
    this.protelReservations = []
    this.reservations = []
    this.arrivalDate = new Date()
    this.departureDate = this.dateHelper.addDays(this.arrivalDate, 1)
    this.startPropertyName = ''
    this.endPropertyName = ''
    this.selectedRegions = []
    this.selectedParks = []
    this.selectedCamps = []
  }
}
