import type { IRoomRate } from '@/interfaces/availability/IRoomRate'

export class RoomRate implements IRoomRate {
  ratesCode: string
  roomRate: number

  constructor() {
    this.ratesCode = ''
    this.roomRate = 0
  }
}
