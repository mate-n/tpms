export interface IProfileDocument {
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
  id: number
}
