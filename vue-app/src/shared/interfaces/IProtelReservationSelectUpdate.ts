import type { IGuestsPerRoom } from './IGuestsPerRoom'
import type { IProtelAvailability } from './protel/IProtelAvailability'
import type { IProtelPark } from './protel/IProtelPark'

export interface IProtelReservationSelectUpdate {
  selectedAvailabilities: IProtelAvailability[]
  property_code: string
  roomTypeCode: string
  roomTypeCodeClone?: string
  guestsPerRoom: IGuestsPerRoom | undefined
  park: IProtelPark
}
