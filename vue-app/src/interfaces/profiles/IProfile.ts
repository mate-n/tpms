export interface IProfile {
  id: number
  firstName: string
  lastName: string
  middleName: string
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
  salutation: string
  personalSalutation: string
  language: string
  vip: string
  activeStatus: string
  profileType: string
  city: string
  isPasserby: boolean
  contactDetailIds: number[]
  adressIds: number[]

  clone(): IProfile
  castToProfile(profile: IProfile): void
}
