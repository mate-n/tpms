import type { IPropertyAvailability } from '@/interfaces/availability/IPropertyAvailability'
import type { IRoomRate } from '@/interfaces/availability/IRoomRate'
import type { IRoom } from '@/interfaces/IRoom'
import { Room } from './Room'

export class PropertyAvailability implements IPropertyAvailability {
  room: IRoom
  availabilityCount: number
  baseRateCategory: string
  ratesData: IRoomRate[]

  constructor() {
    this.room = new Room()
    this.availabilityCount = 0
    this.baseRateCategory = ''
    this.ratesData = []
  }
}
