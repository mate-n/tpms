export interface IProfile {
  id: number

  //General
  firstName: string
  lastName: string
  middleName: string
  salutation: string
  personalSalutation: string
  vip: string
  language: string
  activeStatus: string
  profileType: string

  email: string
  company: string
  occupation: string
  specialRates: number[]
  licensePlate: string
  passportNumber: string

  dateOfBirth: Date
  placeOfBirth: string
  countryOfBirth: string

  gender: string
  nationality: string
  country: string

  city: string
  isPasserby: boolean

  //Preferences / Notes
  preferencesRoomIds: number[]
  preferencesRoomNumber: number
  preferencesRoomLanguage: string
  preferencesNotes: string

  //Marketing
  marketingCodes: string[]
  marketingTags: string[]
  marketingAllowed: boolean
  marketingDataProcessingAllowed: boolean
  marketingApprovalToPrintMembershipCard: boolean

  //associations
  contactDetailIds: number[]
  adressIds: number[]
  membershipCardIds: number[]
  documentIds: number[]
  attachmentIds: number[]
  commisionIds: number[]
  stationeryIds: number[]
  invoiceIds: number[]
  reservationIds: number[]
  traceIds: number[]

  clone(): IProfile
  castToProfile(profile: IProfile): void
}
