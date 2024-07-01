import type { IEntityWithProfile } from '../IEntityWithProfile'
import type { IEntityWithTickets } from '../IEntityWithTickets'
import type { IGuestsPerRoom } from '../IGuestsPerRoom'
import type { ITicket } from '../ITicket'
import type { IProtelAvailability } from './IProtelAvailability'

export interface IProtelAvailabilityGroup extends IEntityWithTickets, IEntityWithProfile {
  id: number
  availabilities: IProtelAvailability[]
  roomTypeCode: string
  guestsPerRoom: IGuestsPerRoom
  numberOfRooms: number
  tickets: ITicket[]
}
