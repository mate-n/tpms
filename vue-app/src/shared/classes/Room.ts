import type { IRoom } from '../../shared/interfaces/IRoom'

export class Room implements IRoom {
  type: number
  minOccupancy: number
  maxOccupancy: number
  code: string
  name: string
  description: string
  id: number

  constructor() {
    this.type = 0
    this.minOccupancy = 0
    this.maxOccupancy = 0
    this.code = ''
    this.name = ''
    this.description = ''
    this.id = 0
  }
}
