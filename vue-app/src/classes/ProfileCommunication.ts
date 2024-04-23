import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'

export class ProfileCommunication implements IProfileCommunication {
  communicationTypeID: number | undefined
  typeID: number
  value: string
  primary: boolean
  description: string
  profileID: number
  uniqueHash?: number

  constructor() {
    this.typeID = 0
    this.value = ''
    this.primary = false
    this.description = ''
    this.profileID = 0
    this.uniqueHash = new Date().getTime()
  }
}
