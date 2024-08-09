import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IGuestsPerRoom } from '../interfaces/IGuestsPerRoom'
import type { IRate } from '../interfaces/IRate'
import { GuestsPerRoom } from './GuestsPerRoom'
import { Rate } from './Rate'
import type { ITicket } from '../interfaces/ITicket'
import { LocalIDFactory } from '../factories/LocalIDFactory'
import type { IConservationFeePrices } from '../interfaces/IConservationFeePrices'
import { ConservationFeePrices } from './ConservationFeePrices'

export class ProtelReservation implements IProtelReservation {
  localID?: string

  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  guestsPerRoom: IGuestsPerRoom
  rate: IRate
  roomTypeCode: string
  guestID: number
  isBookerGuest: boolean
  property_code: string
  property_name: string
  type_code: string
  tickets: ITicket[]
  cartITemID: number | undefined
  conservationFeePrices: IConservationFeePrices
  id?: number | undefined
  parkID: string

  constructor() {
    this.localID = LocalIDFactory.createLocalID()
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.numberOfRooms = 1
    this.guestsPerRoom = new GuestsPerRoom()
    this.rate = new Rate()
    this.roomTypeCode = ''
    this.guestID = 0
    this.isBookerGuest = false
    this.property_code = ''
    this.property_name = ''
    this.type_code = ''
    this.tickets = []
    this.conservationFeePrices = new ConservationFeePrices()
    this.parkID = ''
  }
}
