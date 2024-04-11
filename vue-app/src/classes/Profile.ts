import type { IProfile } from '@/interfaces/profiles/IProfile'

export class Profile implements IProfile {
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

  constructor() {
    this.id = 0
    this.firstName = ''
    this.lastName = ''
    this.middleName = ''
    this.email = ''
    this.company = ''
    this.occupation = ''
    this.specialRates = []
    this.licensePlate = ''
    this.passportNumber = ''
    this.dateOfBirth = new Date()
    this.placeOfBirth = ''
    this.countryOfBirth = ''
    this.gender = ''
    this.nationality = ''
    this.country = ''
    this.salutation = ''
    this.personalSalutation = ''
    this.language = ''
    this.vip = ''
    this.activeStatus = ''
    this.profileType = ''
    this.city = ''
    this.isPasserby = false
    this.contactDetailIds = []
    this.adressIds = []
  }

  clone(): IProfile {
    const profile = new Profile()
    profile.id = this.id
    profile.firstName = this.firstName
    profile.lastName = this.lastName
    profile.middleName = this.middleName
    profile.email = this.email
    profile.company = this.company
    profile.occupation = this.occupation
    profile.specialRates = this.specialRates
    profile.licensePlate = this.licensePlate
    profile.passportNumber = this.passportNumber
    profile.dateOfBirth = this.dateOfBirth
    profile.placeOfBirth = this.placeOfBirth
    profile.countryOfBirth = this.country
    profile.gender = this.gender
    profile.nationality = this.nationality
    profile.country = this.country
    profile.salutation = this.salutation
    profile.personalSalutation = this.personalSalutation
    profile.language = this.language
    profile.vip = this.vip
    profile.activeStatus = this.activeStatus
    profile.profileType = this.profileType
    profile.city = this.city
    profile.isPasserby = this.isPasserby
    profile.contactDetailIds = [...this.contactDetailIds]
    profile.adressIds = [...this.adressIds]
    return profile
  }

  castToProfile(profile: IProfile): void {
    this.id = profile.id
    this.firstName = profile.firstName
    this.lastName = profile.lastName
    this.middleName = profile.middleName
    this.email = profile.email
    this.company = profile.company
    this.occupation = profile.occupation
    this.specialRates = profile.specialRates
    this.licensePlate = profile.licensePlate
    this.passportNumber = profile.passportNumber
    this.dateOfBirth = profile.dateOfBirth
    this.placeOfBirth = profile.placeOfBirth
    this.countryOfBirth = profile.country
    this.gender = profile.gender
    this.nationality = profile.nationality
    this.country = profile.country
    this.salutation = profile.salutation
    this.personalSalutation = profile.personalSalutation
    this.language = profile.language
    this.vip = profile.vip
    this.activeStatus = profile.activeStatus
    this.profileType = profile.profileType
    this.city = profile.city
    this.isPasserby = profile.isPasserby
    this.contactDetailIds = [...profile.contactDetailIds]
    this.adressIds = [...profile.adressIds]
  }
}
