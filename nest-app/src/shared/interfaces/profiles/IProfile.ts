import type { IEntityWithErrors } from '../IEntityWithErrors'
import type { IEntityWithIdentity } from '../IEntityWithIdentity'
import type { IProfileCommunication } from './IProfileCommunication'
import type { IProfileMembershipCard } from './IProfileMembershipCard'

export interface IProfile extends IEntityWithIdentity, IEntityWithErrors {
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
