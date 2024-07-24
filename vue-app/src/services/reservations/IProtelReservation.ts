import type { IEntityWithConservationFees } from '@/shared/interfaces/IEntityWithConservationFees'
import type { IEntityWithIdentity } from '@/shared/interfaces/IEntityWithIdentity'
import type { IEntityWithTickets } from '@/shared/interfaces/IEntityWithTickets'
import type { IGuestsPerRoom } from '@/shared/interfaces/IGuestsPerRoom'
import type { IRate } from '@/shared/interfaces/IRate'
export interface IProtelReservation
  extends IEntityWithTickets,
    IEntityWithConservationFees,
    IEntityWithIdentity {
  arrivalDate: Date
  departureDate: Date
  numberOfRooms: number
  guestsPerRoom: IGuestsPerRoom
  rate: IRate
  roomTypeCode: string
  guestID: number
  isBookerGuest: boolean
  property_code: string
  property_name: string
  type_code: string
  cartITemID: number | undefined
}
