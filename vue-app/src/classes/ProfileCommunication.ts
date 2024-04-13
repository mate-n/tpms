import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'

export class ProfileCommunication implements IProfileCommunication {
  id: number
  communicationTypeID: number
  typeID: number
  value: string
  primary: boolean
  description: string
  profileID: number

  constructor() {
    this.id = 0
    this.communicationTypeID = 0
    this.typeID = 0
    this.value = ''
    this.primary = false
    this.description = ''
    this.profileID = 0
  }
}
