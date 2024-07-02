import type { IEntityWithErrors } from '../IEntityWithErrors'
import type { IEntityWithIdentity } from '../IEntityWithIdentity'
import type { IProfileCommunication } from './IProfileCommunication'
import type { IProfileMembershipCard } from './IProfileMembershipCard'

export interface IProfile extends IEntityWithIdentity, IEntityWithErrors {
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
  sAId: string
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
}
