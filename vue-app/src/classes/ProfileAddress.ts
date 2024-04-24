import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'

export class ProfileAddress implements IProfileAddress {
  id?: number
  profileID: number = 0
  typeString: string = ''
  recipient: string = ''
  country: string = ''
  state: string = ''
  zip: string = ''
  city: string = ''
  street1: string = ''
  street2: string = ''
  street3: string = ''
  mailingAddress: boolean = false
  primary: boolean = false
  nationalityISO3166Alpha2: string
  countryISO3: string
  uniqueHash?: number

  constructor() {
    this.profileID = 0
    this.typeString = ''
    this.recipient = ''
    this.country = ''
    this.state = ''
    this.zip = ''
    this.city = ''
    this.street1 = ''
    this.street2 = ''
    this.street3 = ''
    this.mailingAddress = false
    ;(this.primary = false), (this.nationalityISO3166Alpha2 = '')
    this.countryISO3 = ''
    this.uniqueHash = new Date().getTime()
  }
}
