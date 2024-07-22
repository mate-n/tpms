import type { IEntityWithErrors } from '../IEntityWithErrors'
import type { IProtelAvailability } from './IProtelAvailability'

export interface IProtelAvailabilitySelectable extends IEntityWithErrors {
  selected: boolean
  selectable: boolean
  availability: IProtelAvailability
  element?: any
}
