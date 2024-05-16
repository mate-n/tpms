import type { IStationery } from '../interfaces/IStationery'

export class Stationery implements IStationery {
  id?: number
  createdAt: Date
  updatedAt: Date
  language: string
  template: string
  type: string
  profileID: number | undefined
  profileEmail: string
  recipient: string
  addAdditionalText: boolean
  additionalText: string

  constructor() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.language = ''
    this.template = ''
    this.type = ''
    this.profileID = undefined
    this.profileEmail = ''
    this.recipient = ''
    this.addAdditionalText = false
    this.additionalText = ''
  }
}
