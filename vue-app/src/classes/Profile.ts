import type { IProfile } from '@/interfaces/profiles/IProfile'

export class Profile implements IProfile {
  firstName: string
  lastName: string
  middleName: string
  email: string
  company: string
  birthday: string
  country: string
  salutation: string
  personalSalutation: string
  language: string
  vip: string
  activeStatus: string
  profileType: string
  id: number
  city: string
  isPasserby: boolean

  constructor() {
    this.firstName = ''
    this.lastName = ''
    this.middleName = ''
    this.email = ''
    this.company = ''
    this.birthday = ''
    this.country = ''
    this.salutation = ''
    this.personalSalutation = ''
    this.language = ''
    this.vip = ''
    this.activeStatus = 'ACTIVE'
    this.profileType = 'private'
    this.id = 0
    this.city = ''
    this.isPasserby = false
  }

  clone(): IProfile {
    const profile = new Profile()
    profile.firstName = this.firstName
    profile.lastName = this.lastName
    profile.middleName = this.middleName
    profile.email = this.email
    profile.company = this.company
    profile.birthday = this.birthday
    profile.country = this.country
    profile.salutation = this.salutation
    profile.personalSalutation = this.personalSalutation
    profile.language = this.language
    profile.vip = this.vip
    profile.activeStatus = this.activeStatus
    profile.profileType = this.profileType
    profile.id = this.id
    profile.city = this.city
    profile.isPasserby = this.isPasserby
    return profile
  }
}
