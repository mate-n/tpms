import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { CloneHelper } from './CloneHelper'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'

export class ItineraryReservationClonser {
  cloneHelper = new CloneHelper()

  clone(itineraryReservation: IItineraryReservation): IItineraryReservation {
    let clone = new ItineraryReservation()
    clone = Object.assign(clone, itineraryReservation)
    clone.arrivalDate = new Date(itineraryReservation.arrivalDate)
    clone.departureDate = new Date(itineraryReservation.departureDate)
    return clone
  }
}
