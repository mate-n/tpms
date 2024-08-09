import type { IGuestsPerRoom } from './IGuestsPerRoom'
import type { IProtelAvailability } from './protel/IProtelAvailability'

export interface IProtelReservationSelectUpdate {
  selectedAvailabilities: IProtelAvailability[]
  property_code: string
  roomTypeCode: string
  roomTypeCodeClone?: string
  guestsPerRoom: IGuestsPerRoom | undefined
}
