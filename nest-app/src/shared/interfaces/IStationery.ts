import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IEntityWithTimeStamps } from './IEntityWithTimeStamps'

export interface IStationery
  extends IEntityWithIdentity,
    IEntityWithTimeStamps {
  language: string
  template: string
  type: string
  profileID: number | undefined
  profileEmail: string
  recipient: string
  addAdditionalText: boolean
  additionalText: string
}
