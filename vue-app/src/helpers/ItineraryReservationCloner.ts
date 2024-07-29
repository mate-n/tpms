import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { CloneHelper } from './CloneHelper'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'

export class ItineraryReservationCloner {
  cloneHelper = new CloneHelper()

  clone(itineraryReservation: IItineraryReservation): IItineraryReservation {
    let clone = new ItineraryReservation()
    clone = Object.assign(clone, this.cloneHelper.clone(itineraryReservation))
    clone.arrivalDate = new Date(itineraryReservation.arrivalDate)
    clone.departureDate = new Date(itineraryReservation.departureDate)

    for (const protelReservation of clone.protelReservations) {
      protelReservation.arrivalDate = new Date(protelReservation.arrivalDate)
      protelReservation.departureDate = new Date(protelReservation.departureDate)
    }

    return clone
  }
}
