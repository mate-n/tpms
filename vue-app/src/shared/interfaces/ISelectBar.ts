import type { IProtelAvailabilitySelectable } from './protel/IProtelAvailabilitySelectable'
export interface ISelectBar {
  id: number
  element?: any
  protelAvailabilitySelectables: IProtelAvailabilitySelectable[]
}
