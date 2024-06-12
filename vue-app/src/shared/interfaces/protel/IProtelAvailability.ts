export interface IProtelAvailability {
  id: string
  transaction_id: string
  unique_message_id: string
  request_id: string
  date_time: string
  pms_type: string
  property_code: string
  type: string
  room_type_code: string
  default_occupancy: string
  max_occupancy: number
  availability_start: string
  availability_end: string
  availability_count: string
  park_name: string
  property_name: string
  room_type_name: string
  features: string
  rates_data: IRatesData[]
}

interface IRatesData {
  rates_code: string
  occupancy: string
  room_rate: string
  add_on_child1: string
}
