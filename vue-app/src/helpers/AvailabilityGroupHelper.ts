import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'
import { DateHelper } from './DateHelper'
import { RatesHelper } from './RatesHelper'
import { TicketHelper } from './TicketHelper'

export class AvailabilityGroupHelper {
  ticketHelper = new TicketHelper()
  dateHelper = new DateHelper()
  ratesHelper = new RatesHelper()
  sortByDate(availabilityGroup: IProtelAvailabilityGroup) {
    availabilityGroup.availabilities.sort((a, b) => {
      return new Date(a.availability_start).getTime() - new Date(b.availability_start).getTime()
    })
  }

  getAvailabilityGroupsFromReservations(reservations: IReservation[]) {
    const availabilityGroups: IProtelAvailabilityGroup[] = []
    for (const reservation of reservations) {
      for (const availabilityGroup of reservation.selectedProtelAvailabilityGroups) {
        availabilityGroups.push(availabilityGroup)
      }
    }

    availabilityGroups.sort((a, b) => {
      return this.getArrivalDate(a).getTime() - this.getArrivalDate(b).getTime()
    })

    return availabilityGroups
  }

  getArrivalDate(availabilityGroup: IProtelAvailabilityGroup) {
    let arrivalDate = availabilityGroup.availabilities[0].availability_start
    for (const availability of availabilityGroup.availabilities) {
      if (availability.availability_start.getTime() < arrivalDate.getTime()) {
        arrivalDate = availability.availability_start
      }
    }
    return arrivalDate
  }

  getDepartureDate(availabilityGroup: IProtelAvailabilityGroup) {
    let departureDate = availabilityGroup.availabilities[0].availability_start
    for (const availability of availabilityGroup.availabilities) {
      if (availability.availability_start.getTime() > departureDate.getTime()) {
        departureDate = availability.availability_start
      }
    }
    return this.dateHelper.addDays(departureDate, 1)
  }

  calculateTotalRate(availabilityGroup: IProtelAvailabilityGroup): number {
    let roomRate = 0

    for (const protelAvailability of availabilityGroup.availabilities) {
      roomRate += this.ratesHelper.calculateActualRate(
        protelAvailability.rates_data[0],
        availabilityGroup.guestsPerRoom
      )
    }

    return roomRate
  }

  calculateAverageRate(availabilityGroup: IProtelAvailabilityGroup): number {
    return this.calculateTotalRate(availabilityGroup) / availabilityGroup.availabilities.length
  }

  calculateTotalReservationPrice(availabilityGroup: IProtelAvailabilityGroup): number {
    let totalPrice = 0
    totalPrice += this.calculateTotalRate(availabilityGroup)
    totalPrice += this.ticketHelper.getTotalPrice(availabilityGroup.tickets)
    return totalPrice
  }

  calculateTotalPrice(availabilityGroups: IProtelAvailabilityGroup[]): number {
    let total = 0
    for (const availabilityGroup of availabilityGroups) {
      const roomRate = this.calculateTotalRate(availabilityGroup)
      total += roomRate + this.ticketHelper.getTotalPrice(availabilityGroup.tickets)
    }
    return total
  }
}
