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
  errors: Record<string, string>

  constructor() {
    this.id = 0
    this.camp = ''
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.rooms = 1
    this.roomType = ''
    this.guestsPerRoom = 1
    this.guest = ''
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.availabilities = []
    this.issues = []
    this.errors = {}
  }

  reset() {
    this.camp = ''
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.rooms = 1
    this.roomType = ''
    this.guestsPerRoom = 1
    this.guest = ''
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.availabilities = []
    this.issues = []
    this.errors = {}
  }
}
