import type { IProtelAvailability } from '../interfaces/protel/IProtelAvailability'
import type { IRatesData } from '../interfaces/protel/IRatesData'
import { RatesData } from './RatesData'

export class ProtelAvailability implements IProtelAvailability {
  id: string
  transaction_id: string
  unique_message_id: string
  request_id: string
  date_time: Date
  pms_type: string
  property_code: string
  type: string
  room_type_code: string
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

  constructor() {
    this.id = ''
    this.transaction_id = ''
    this.unique_message_id = ''
    this.request_id = ''
    this.date_time = new Date()
    this.pms_type = ''
    this.property_code = ''
    this.type = ''
    this.room_type_code = ''
    this.default_occupancy = ''
    this.max_occupancy = 0
    this.availability_start = new Date()
    this.availability_end = new Date()
    this.availability_count = 0
    this.park_name = ''
    this.property_name = ''
    this.room_type_name = ''
    this.features = ''
    this.rates_data = [new RatesData()]
  }
}
