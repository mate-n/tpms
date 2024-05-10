import type { IEntityWithIdentity } from '../IEntityWithIdentity'

export interface IProfileAddress extends IEntityWithIdentity {
  profileID: number
  typeString: string
  recipient: string
  country: string
  state: string
  zip: string
  city: string
  street1: string
  street2: string
  street3: string
  mailingAddress: boolean
  primary: boolean
  nationalityISO3166Alpha2: string
  countryISO3: string
}
