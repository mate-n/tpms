import { LocalIDFactory } from '../../shared/factories/LocalIDFactory'
import type { IProfileCommunication } from '../../shared/interfaces/profiles/IProfileCommunication'

export class ProfileCommunication implements IProfileCommunication {
  communicationTypeID: number | undefined
  typeID: number
  value: string
  primary: boolean
  description: string
  profileID: number
  localID?: string

  constructor() {
    this.typeID = 0
    this.value = ''
    this.primary = false
    this.description = ''
    this.profileID = 0
    this.localID = LocalIDFactory.createLocalID()
  }
}
