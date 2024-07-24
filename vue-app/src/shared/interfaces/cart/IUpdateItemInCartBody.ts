import type { IPricing } from './IPricing'

export interface IUpdateItemInCartBody {
  action: string
  cart_item_id: number
  cart_id: string
  arrival_date: string
  departure_date: string
  adults: number
  children: number
  units: number
  conservation_fees: number
  southafrican_adults: number
  sadc_adults: number
  international_adults: number
  southafrican_children: number
  sadc_children: number
  international_children: number
  pricing: IPricing
  property_code: number
  type_code: string
  parent: number
  item_type: number
  gmsTimeSlotId: number
}
