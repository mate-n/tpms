import type { IGuestsPerRoom } from '@/shared/interfaces/IGuestsPerRoom'
import type { IRate } from '@/shared/interfaces/IRate'

export interface IProtelReservation {
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  guestsPerRoom: IGuestsPerRoom
  rate: IRate
  roomTypeCode: string
  guestID: number
  isBookerGuest: boolean
}
