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
    this.activeStatus = ''
    this.profileType = 'private'
  }
}
