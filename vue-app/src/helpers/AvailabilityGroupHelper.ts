import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'

export class AvailabilityGroupHelper {
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
    return availabilityGroups
  }
}
