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
  guestProfileID: number | undefined
  companyProfileID: number | undefined
  sourceProfileID: number | undefined
  travelAgentProfileID: number | undefined
  bookerProfileID: number | undefined
  baseRateCategory: string
  orderIndex: number
  propertyAvailabilities: IPropertyAvailability[]
  issues: string[]
  errors: Record<string, string>
  dateHelper: DateHelper = new DateHelper()
  isBookerGuest: boolean

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
    this.isBookerGuest = true
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
    this.guestProfileID = undefined
    this.companyProfileID = undefined
    this.sourceProfileID = undefined
    this.travelAgentProfileID = undefined
    this.bookerProfileID = undefined
    this.propertyID = undefined
    this.propertyAvailabilities = []
    this.issues = []
    this.errors = {}
    this.isBookerGuest = true
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
