import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IGuestsPerRoom } from '../interfaces/IGuestsPerRoom'
import type { IRate } from '../interfaces/IRate'
import { GuestsPerRoom } from './GuestsPerRoom'
import { Rate } from './Rate'
import type { ITicket } from '../interfaces/ITicket'

export class ProtelReservation implements IProtelReservation {
  id: string
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

  constructor() {
    this.id = crypto.randomUUID()
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
  }
}
