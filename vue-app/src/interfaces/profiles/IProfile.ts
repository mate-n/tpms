export interface IProfile {
  id: number
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
  city: string
  isPasserby: boolean
  clone(): IProfile
}
