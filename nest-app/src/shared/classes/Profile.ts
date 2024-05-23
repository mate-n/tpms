import { LocalIDFactory } from '../../shared/factories/LocalIDFactory'
import type { IProfile } from '../../shared/interfaces/profiles/IProfile'

export class Profile implements IProfile {
  id?: number
  localID?: string

  //General
  name: string
  firstName: string
  lastName: string
  middleName: string
  postNominalTitle: string
  email: string
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

  //Communications / Contact details
  communicationIDs: number[]

  //Addresses
  addressIDs: number[]

  //Personal Info
  birthPlace: string
  birthCountry: string
  birthday: Date
  gender: string
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

    //General
    this.name = ''
    this.firstName = ''
    this.lastName = ''
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

    //Communications / Contact details
    this.communicationIDs = []

    //Addresses
    this.addressIDs = []

    //Personal Info
    this.birthPlace = ''
    this.birthCountry = ''
    this.birthday = new Date()
    this.gender = ''
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
