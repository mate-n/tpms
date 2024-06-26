import { CloneHelper } from '../../helpers/CloneHelper'
import { DateHelper } from '../../helpers/DateHelper'
import { LocalIDFactory } from '../../shared/factories/LocalIDFactory'
import type { IReservation } from '../../shared/interfaces/IReservation'
import type { IPropertyAvailability } from '../../shared/interfaces/availability/IPropertyAvailability'
import type { IGuestsPerRoom } from '../interfaces/IGuestsPerRoom'
import type { ITicket } from '../interfaces/ITicket'
import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityGroup } from '../interfaces/protel/IProtelAvailabilityGroup'
import { GuestsPerRoom } from './GuestsPerRoom'

export class Reservation implements IReservation {
  id?: number
  localID?: string
  propertyID: number | undefined
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  roomID: number | undefined
  profileID: number | undefined
  guestProfileID: number | undefined
  companyProfileID: number | undefined
  sourceProfileID: number | undefined
  travelAgentProfileID: number | undefined
  bookerProfileID: number | undefined
  baseRateCategory: string
  orderIndex: number
  propertyAvailabilities: IPropertyAvailability[]
  protelAvailabilities: IProtelAvailability[]
  selectedProtelAvailabilityGroups: IProtelAvailabilityGroup[]
  issues: string[]
  errors: Record<string, string>
  dateHelper: DateHelper = new DateHelper()
  isBookerGuest: boolean
  ticketIDs: number[]
  tickets: ITicket[]
  totalRate: number
  averageRate: number
  guestName: string
  propertyName: string
  guestsPerRoom: IGuestsPerRoom
  cloneHelper: CloneHelper = new CloneHelper()

  constructor() {
    this.localID = LocalIDFactory.createLocalID()
    this.arrivalDate = this.dateHelper.getTodayDate()
    this.departureDate = this.dateHelper.addDays(this.arrivalDate, 2)
    this.numberOfRooms = 1
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.propertyAvailabilities = []
    this.protelAvailabilities = []
    this.selectedProtelAvailabilityGroups = []
    this.issues = []
    this.errors = {}
    this.isBookerGuest = true
    this.ticketIDs = []
    this.tickets = []
    this.totalRate = 0
    this.averageRate = 0
    this.guestName = ''
    this.propertyName = ''
    this.guestsPerRoom = new GuestsPerRoom()
  }

  convertToReservation(reservation: IReservation) {
    this.id = reservation.id
    this.localID = reservation.localID
    this.propertyID = reservation.propertyID
    this.arrivalDate = new Date(reservation.arrivalDate)
    this.departureDate = new Date(reservation.departureDate)
    this.numberOfRooms = reservation.numberOfRooms
    this.roomID = reservation.roomID
    this.profileID = reservation.profileID
    this.guestProfileID = reservation.guestProfileID
    this.companyProfileID = reservation.companyProfileID
    this.sourceProfileID = reservation.sourceProfileID
    this.travelAgentProfileID = reservation.travelAgentProfileID
    this.bookerProfileID = reservation.bookerProfileID
    this.baseRateCategory = reservation.baseRateCategory
    this.orderIndex = reservation.orderIndex
    this.propertyAvailabilities = reservation.propertyAvailabilities
    this.protelAvailabilities = reservation.protelAvailabilities
    this.selectedProtelAvailabilityGroups = reservation.selectedProtelAvailabilityGroups
    this.issues = reservation.issues
    if (reservation.errors) {
      this.errors = reservation.errors
    }
    this.isBookerGuest = reservation.isBookerGuest
    this.ticketIDs = reservation.ticketIDs
    this.tickets = reservation.tickets
    this.totalRate = reservation.totalRate
    this.averageRate = reservation.averageRate
    this.guestName = reservation.guestName
    this.propertyName = reservation.propertyName
    this.guestsPerRoom = reservation.guestsPerRoom
    return this
  }

  reset() {
    this.arrivalDate = new Date()
    this.departureDate = this.dateHelper.addDays(this.arrivalDate, 1)
    this.numberOfRooms = 1
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
    this.protelAvailabilities = []
    this.selectedProtelAvailabilityGroups = []
    this.issues = []
    this.errors = {}
    this.isBookerGuest = true
    this.ticketIDs = []
    this.guestName = ''
    this.propertyName = ''
    this.guestsPerRoom = new GuestsPerRoom()
  }

  resetInItineraryReservation() {
    this.arrivalDate = new Date()
    this.departureDate = this.dateHelper.addDays(this.arrivalDate, 1)
    this.numberOfRooms = 1
    this.baseRateCategory = ''
    this.orderIndex = 0
    this.roomID = undefined
    this.profileID = undefined
    this.guestProfileID = undefined
    this.companyProfileID = undefined
    this.sourceProfileID = undefined
    this.travelAgentProfileID = undefined
    this.bookerProfileID = undefined
    //this.propertyID = undefined
    this.propertyAvailabilities = []
    this.protelAvailabilities = []
    this.selectedProtelAvailabilityGroups = []
    this.issues = []
    this.errors = {}
    this.isBookerGuest = true
    this.ticketIDs = []
    this.guestName = ''
    //this.propertyName = ''
    this.guestsPerRoom = new GuestsPerRoom()
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

  clone(reservation: IReservation): IReservation {
    this.cloneHelper.clone(reservation)
    this.convertToReservation(reservation)
    return reservation
  }
}
