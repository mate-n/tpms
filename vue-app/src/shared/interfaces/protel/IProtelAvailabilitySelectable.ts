import type { IProtelAvailability } from './IProtelAvailability'

export interface IProtelAvailabilitySelectable {
  selected: boolean
  availability: IProtelAvailability
  element?: any
}
