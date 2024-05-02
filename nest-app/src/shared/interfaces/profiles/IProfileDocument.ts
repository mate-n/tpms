import type { IEntityWithIdentity } from '../IEntityWithIdentity'

export interface IProfileDocument extends IEntityWithIdentity {
  validFrom: Date
  validTo: Date
  city: string
  country: string
  number: number
  profileID: number
  supportNumber: number | null
  primary: boolean
  shortName: string
  typeID: number
  udfRawData: string | null
}
