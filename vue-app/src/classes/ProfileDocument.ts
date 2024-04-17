import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'

export class ProfileDocument implements IProfileDocument {
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

  constructor() {
    this.validFrom = new Date()
    this.validTo = new Date()
    this.city = ''
    this.country = ''
    this.number = 0
    this.profileID = 0
    this.supportNumber = null
    this.primary = false
    this.shortName = ''
    this.typeID = 0
    this.udfRawData = null
    this.id = 0
  }
}
