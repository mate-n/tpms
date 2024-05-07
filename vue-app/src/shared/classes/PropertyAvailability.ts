import type { IPropertyAvailability } from '../../shared/interfaces/availability/IPropertyAvailability'
import type { IRoomRate } from '../../shared/interfaces/availability/IRoomRate'
import type { IRoom } from '../../shared/interfaces/IRoom'
import { Room } from './Room'

export class PropertyAvailability implements IPropertyAvailability {
  room: IRoom
  availabilityCount: number
  baseRateCategory: string
  roomRates: IRoomRate[]

  constructor() {
    this.room = new Room()
    this.availabilityCount = 0
    this.baseRateCategory = ''
    this.roomRates = []
  }
}
