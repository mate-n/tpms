import type { IEntityWithIdentity } from '../IEntityWithIdentity'

export interface IProfileCommunication extends IEntityWithIdentity {
  communicationTypeID: number | undefined
  typeID: number
  value: string
  primary: boolean
  description: string
  profileID: number
}
