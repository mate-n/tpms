import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'

export class ItineraryReservationHelper {
  getStartDate(itineraryReservation: IItineraryReservation): Date | undefined {
    if (itineraryReservation.protelReservations.length === 0) {
      return undefined
    }
    return itineraryReservation.protelReservations.reduce((startDate, reservation) => {
      if (reservation.arrivalDate < startDate) {
        return reservation.arrivalDate
      }
      return startDate
    }, itineraryReservation.protelReservations[0].arrivalDate)
  }

  getEndDate(itineraryReservation: IItineraryReservation): Date | undefined {
    if (itineraryReservation.protelReservations.length === 0) {
      return undefined
    }
    return itineraryReservation.protelReservations.reduce((endDate, reservation) => {
      if (reservation.departureDate > endDate) {
        return reservation.departureDate
      }
      return endDate
    }, itineraryReservation.protelReservations[0].departureDate)
  }

  getCampIDsFromAllProtelReservations(itineraryReservation: IItineraryReservation) {
    const campIDs: string[] = []
    for (const reservation of itineraryReservation.protelReservations) {
      campIDs.push(reservation.property_code)
    }
    return campIDs
  }
}
