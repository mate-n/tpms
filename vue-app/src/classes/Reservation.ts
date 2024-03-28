import type { IAvailability } from '@/interfaces/IAvailability'
import type { IReservation } from '@/interfaces/IReservation'

export class Reservation implements IReservation {
  id: number
  camp: string
  arrivalDate: Date
  departureDate: Date
  rooms: number
  roomType: string
  guestsPerRoom: number
  guest: string
  baseRateCategory: string
  orderIndex: number
  availabilities: IAvailability[]
  issues: string[]

  constructor() {
    this.id = 0
    this.camp = ''
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.rooms = 0
    this.roomType = ''
    this.guestsPerRoom = 0
    this.guest = ''
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.availabilities = []
    this.issues = []
  }

  reset() {
    this.camp = ''
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.rooms = 0
    this.roomType = ''
    this.guestsPerRoom = 0
    this.guest = ''
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.availabilities = []
    this.issues = []
  }
}
