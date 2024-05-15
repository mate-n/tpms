import type { IStationery } from '../interfaces/IStationery'

export class Stationery implements IStationery {
  language: string
  template: string
  type: string
  profileID: number | undefined
  recipient: string
  addAdditionalText: boolean
  additionalText: string

  constructor() {
    this.language = ''
    this.template = ''
    this.type = ''
    this.profileID = undefined
    this.recipient = ''
    this.addAdditionalText = false
    this.additionalText = ''
  }
}
