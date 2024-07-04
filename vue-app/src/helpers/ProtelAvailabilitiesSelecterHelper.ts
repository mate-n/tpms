import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { DateHelper } from './DateHelper'

export class ProtelAvailabilitiesSelecterHelper {
  dateHelper = new DateHelper()
  getCorrespondingProtelAvailabilitySelectables(
    protelAvailabilitySelectables: IProtelAvailabilitySelectable[],
    protelAvailabilityGroup: IProtelAvailabilityGroup
  ) {
    return protelAvailabilitySelectables.filter((protelAvailabilitySelectable) =>
      protelAvailabilityGroup.availabilities.some(
        (protelAvailability) =>
          protelAvailabilitySelectable.availability.id === protelAvailability.id
      )
    )
  }

  getSelectableWithHighestX(protelAvailabilitySelectables: IProtelAvailabilitySelectable[]) {
    const selectableWithTheHighestX = protelAvailabilitySelectables.reduce((prev, current) =>
      prev.element.getBoundingClientRect().x > current.element.getBoundingClientRect().x
        ? prev
        : current
    )
    return selectableWithTheHighestX
  }

  getSelectableWithLowestX(protelAvailabilitySelectables: IProtelAvailabilitySelectable[]) {
    const selectableWithTheLowestX = protelAvailabilitySelectables.reduce((prev, current) =>
      prev.element.getBoundingClientRect().x < current.element.getBoundingClientRect().x
        ? prev
        : current
    )
    return selectableWithTheLowestX
  }

  isDateOccupied(date: Date, protelAvailabilityGroups: IProtelAvailabilityGroup[]) {
    const protelAvailabilities = this.getAllProtelAvailabilities(protelAvailabilityGroups)
    const isDateOccupied = protelAvailabilities.some((protelAvailability) =>
      this.dateHelper.isSameDay(protelAvailability.availability_start, date)
    )
    return isDateOccupied
  }

  getProtelAvailabilityGroupsThatHaveAvailabilityOnDate(
    date: Date,
    protelAvailabilityGroups: IProtelAvailabilityGroup[]
  ) {
    const groups = []
    for (const protelAvailabilityGroup of protelAvailabilityGroups) {
      if (
        protelAvailabilityGroup.availabilities.some((protelAvailability) =>
          this.dateHelper.isSameDay(protelAvailability.availability_start, date)
        )
      ) {
        groups.push(protelAvailabilityGroup)
      }
    }
    return groups
  }

  getAllProtelAvailabilities(protelAvailabilityGroups: IProtelAvailabilityGroup[]) {
    return protelAvailabilityGroups.map((group) => group.availabilities).flat()
  }
}
