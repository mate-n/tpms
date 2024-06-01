import type { IEntityWithIdentity } from './IEntityWithIdentity'
import type { IReservation } from './IReservation'

export interface IItineraryReservation extends IEntityWithIdentity {
  reservations: IReservation[]
}
