import type { IRatesData } from './IRatesData'

export interface IProtelAvailability {
  id: string
  transaction_id: string
  unique_message_id: string
  request_id: string
  date_time: Date
  pms_type: string
  property_code: string
  type: string
  room_type_code: string
  room_type_code_clone?: string
  default_occupancy: string
  max_occupancy: number
  availability_start: Date
  availability_end: Date
  availability_count: number
  park_name: string
  property_name: string
  room_type_name: string
  features: string
  rates_data: IRatesData[]
}
