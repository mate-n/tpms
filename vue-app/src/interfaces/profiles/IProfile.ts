import type { IEntityWithIdentity } from '../IEntityWithIdentity'

export interface IProfile extends IEntityWithIdentity {
  //General
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
  company: string
  occupation: string
  additionalInfoDefaultRateIDs: number[]
  licensePlate: string
  passport: string

  //Preferences / Notes
  preferencesNote: string
  preferencesFeatureIDs: number[]
  preferencesDefaultObjectID: number
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
}
