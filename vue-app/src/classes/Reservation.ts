import type { IProperty } from '@/interfaces/IProperty'
import type { IReservation } from '@/interfaces/IReservation'
import type { IRoom } from '@/interfaces/IRoom'
import type { IPropertyAvailability } from '@/interfaces/availability/IPropertyAvailability'

export class Reservation implements IReservation {
  id: number
  camp: string
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  room: IRoom | undefined
  numberOfGuestsPerRoom: number
  guest: string
  baseRateCategory: string
  orderIndex: number
  property: IProperty | undefined
  propertyAvailabilities: IPropertyAvailability[]
  issues: string[]
  errors: Record<string, string>

  constructor() {
    this.id = 0
    this.camp = ''
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.numberOfRooms = 1
    this.numberOfGuestsPerRoom = 1
    this.guest = ''
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.propertyAvailabilities = []
    this.issues = []
    this.errors = {}
  }

  reset() {
    this.camp = ''
    this.arrivalDate = new Date()
    this.departureDate = new Date()
    this.numberOfRooms = 1
    this.numberOfGuestsPerRoom = 1
    this.guest = ''
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.propertyAvailabilities = []
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
