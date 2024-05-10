import type { IRoom } from '../IRoom'
import type { IRoomRate } from './IRoomRate'

export interface IPropertyAvailability {
  room: IRoom
  availabilityCount: number
  baseRateCategory: string
  roomRates: IRoomRate[]
}
