import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityGroup } from '../interfaces/protel/IProtelAvailabilityGroup'

export class ProtelAvailabilityGroup implements IProtelAvailabilityGroup {
  id: number
  availabilities: IProtelAvailability[]
  roomTypeName: string

  constructor() {
    this.id = new Date().getTime()
    this.availabilities = []
    this.roomTypeName = ''
  }
}
