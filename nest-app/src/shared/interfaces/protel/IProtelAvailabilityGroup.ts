import type { IProtelAvailability } from './IProtelAvailability'

export interface IProtelAvailabilityGroup {
  id: number
  availabilities: IProtelAvailability[]
  roomTypeCode: string
}
