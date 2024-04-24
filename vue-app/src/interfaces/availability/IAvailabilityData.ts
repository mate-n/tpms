import type { IRatesData } from './IRatesData'

export interface IAvailabilityData {
  availability_count: number
  room_type_code: string
  rates_data: IRatesData[]
}
