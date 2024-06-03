import type { IReservation } from '../IReservation'

export interface IReservationSelectable {
  selected: boolean
  reservation: IReservation
}
