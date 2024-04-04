import type { IAvailabilityData } from '@/interfaces/availability/IAvailabilityData'
import type { IProperty } from '@/interfaces/IProperty'
import type { IReservation } from '@/interfaces/IReservation'
import type { IRoom } from '@/interfaces/IRoom'

export class Reservation implements IReservation {
  id: number
  camp: string
  arrivalDate: Date
  departureDate: Date
  rooms: number
  room: IRoom | undefined
  roomType: string
  guestsPerRoom: number
  guest: string
  baseRateCategory: string
  orderIndex: number
  property: IProperty | undefined
  availablityData: IAvailabilityData[]
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
    this.availablityData = []
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
    this.availablityData = []
    this.issues = []
    this.errors = {}
  }

  addIssue(issue: string) {
    const foundIssue = this.issues.find((i) => i === issue)
    if (foundIssue) {
      return
    }
    this.issues.push(issue)
  }

  removeIssue(issue: string) {
    const index = this.issues.indexOf(issue)
    if (index > -1) {
      this.issues.splice(index, 1)
    }
  }
}
