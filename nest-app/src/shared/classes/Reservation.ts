import { DateHelper } from '../../helpers/DateHelper'
import { LocalIDFactory } from '../../shared/factories/LocalIDFactory'
import type { IReservation } from '../../shared/interfaces/IReservation'
import type { IPropertyAvailability } from '../../shared/interfaces/availability/IPropertyAvailability'

export class Reservation implements IReservation {
  id?: number
  localID?: string
  propertyID: number | undefined
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  roomID: number | undefined
  numberOfGuestsPerRoom: number
  profileID: number | undefined
  baseRateCategory: string
  orderIndex: number
  propertyAvailabilities: IPropertyAvailability[]
  issues: string[]
  errors: Record<string, string>
  dateHelper: DateHelper = new DateHelper()

  constructor() {
    this.localID = LocalIDFactory.createLocalID()
    this.arrivalDate = new Date()
    this.departureDate = this.dateHelper.addDays(this.arrivalDate, 1)
    this.numberOfRooms = 1
    this.numberOfGuestsPerRoom = 1
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.propertyAvailabilities = []
    this.issues = []
    this.errors = {}
  }

  reset() {
    this.arrivalDate = new Date()
    this.departureDate = this.dateHelper.addDays(this.arrivalDate, 1)
    this.numberOfRooms = 1
    this.numberOfGuestsPerRoom = 1
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.roomID = undefined
    this.profileID = undefined
    this.propertyID = undefined
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
