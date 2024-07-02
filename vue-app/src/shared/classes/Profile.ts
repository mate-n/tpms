import { LocalIDFactory } from '../../shared/factories/LocalIDFactory'
import type { IProfile } from '../../shared/interfaces/profiles/IProfile'
import type { IProfileCommunication } from '../interfaces/profiles/IProfileCommunication'
import type { IProfileMembershipCard } from '../interfaces/profiles/IProfileMembershipCard'

export class Profile implements IProfile {
  id?: number
  localID?: string

  //Ankerdata
  profileID: number
  title: string
  initial: string
  surname: string
  name: string
  email: string
  telephone: string
  mobile: string
  address: string
  city: string
  postalCode: string
  country: string
  dateofbirth: Date | undefined
  gender: string
  roomseekerclientcode: string
  saId: string
  passportno: string
  countryofbirth: string
  wildcardnumber: string
  loyaltynumber: string
  marketing: string
  reservationsms: string

  //General
  middleName: string
  postNominalTitle: string
  language: string
  phone: string
  deibitorAccount: string
  salesTaxNumber: string
  salesTaxNumber2: string
  salut: string
  salutShort: string
  vipCodeIDs: number[]
  inactive: boolean
  profileType: string
  isPasserby: boolean
  department: string
  iataCode: string
  saIDNumber: number | undefined
  passportNumber: number | undefined
  roomSeekerClientCode: string
  tpmsProfileID: number | undefined
  loyaltyMembershipNumber: number | undefined
  wildcardMembershipNumber: number | undefined

  //Communications / Contact details
  communicationIDs: number[]
  communications: IProfileCommunication[]

  //Addresses
  addressIDs: number[]

  //Personal Info
  birthPlace: string
  birthCountry: string
  nationality: string

  //Additional Info
  companyID: number | undefined
  occupation: string
  additionalInfoDefaultRateIDs: number[]
  licensePlate: string
  passport: string

  //Preferences / Notes
  preferencesNote: string
  preferencesFeatureIDs: number[]
  preferencesDefaultObjectID: number | undefined
  preferencesLanguage: string

  //Marketing
  marketingCodeIDs: number[]
  marketingTagIDs: number[]
  allowMarketing: boolean
  marketingDataProcessing: boolean
  marketingApprovalToPrintMembershipCard: boolean

  //Membership Cards
  membershipCardIDs: number[]
  membershipCards: IProfileMembershipCard[]

  //Documents
  documentIDs: number[]

  //Attachments
  attachmentIDs: number[]

  //Associations
  commisionIds: number[]
  stationeryIds: number[]
  invoiceIds: number[]
  reservationIds: number[]
  traceIds: number[]

  constructor() {
    this.localID = LocalIDFactory.createLocalID()

    //Ankerdata
    this.profileID = 0
    this.title = ''
    this.initial = ''
    this.surname = ''
    this.name = ''
    this.email = ''
    this.telephone = ''
    this.mobile = ''
    this.address = ''
    this.city = ''
    this.postalCode = ''
    this.country = ''
    this.gender = ''
    this.roomseekerclientcode = ''
    this.saId = ''
    this.passportno = ''
    this.countryofbirth = ''
    this.wildcardnumber = ''
    this.loyaltynumber = ''
    this.marketing = ''
    this.reservationsms = ''

    //General
    this.name = ''
    this.middleName = ''
    this.postNominalTitle = ''
    this.email = ''
    this.language = ''
    this.phone = ''
    this.deibitorAccount = ''
    this.salesTaxNumber = ''
    this.salesTaxNumber2 = ''
    this.salut = ''
    this.salutShort = ''
    this.vipCodeIDs = []
    this.inactive = false
    this.profileType = 'Private'
    this.isPasserby = false
    this.department = ''
    this.iataCode = ''
    this.roomSeekerClientCode = ''

    //Communications / Contact details
    this.communicationIDs = []
    this.communications = []

    //Addresses
    this.addressIDs = []

    //Personal Info
    this.birthPlace = ''
    this.birthCountry = ''
    this.nationality = ''

    //Additional Info
    this.companyID = undefined
    this.occupation = ''
    this.additionalInfoDefaultRateIDs = []
    this.licensePlate = ''
    this.passport = ''

    //Preferences / Notes
    this.preferencesNote = ''
    this.preferencesFeatureIDs = []
    this.preferencesDefaultObjectID = undefined
    this.preferencesLanguage = ''

    //Marketing
    this.marketingCodeIDs = []
    this.marketingTagIDs = []
    this.allowMarketing = false
    this.marketingDataProcessing = false
    this.marketingApprovalToPrintMembershipCard = false

    //Membership Cards
    this.membershipCardIDs = []
    this.membershipCards = []

    //Documents
    this.documentIDs = []

    //Attachments
    this.attachmentIDs = []

    //Associations
    this.commisionIds = []
    this.stationeryIds = []
    this.invoiceIds = []
    this.reservationIds = []
    this.traceIds = []
  }
}
