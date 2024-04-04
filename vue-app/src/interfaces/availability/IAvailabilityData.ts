import type { IRatesData } from './IRatesData'

export interface IAvailabilityData {
  availability_count: number
  room_type_code: number
  rates_data: IRatesData[]
}
