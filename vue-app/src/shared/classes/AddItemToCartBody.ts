import type { IAddItemToCartBody } from '../interfaces/cart/IAddItemToCartBody'
import type { IPricing } from '../interfaces/cart/IPricing'

export class AddItemToCartBody implements IAddItemToCartBody {
  action: string
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

  constructor() {
    this.action = ''
    this.cart_id = ''
    this.arrival_date = ''
    this.departure_date = ''
    this.adults = 0
    this.children = 0
    this.units = 0
    this.conservation_fees = 0
    this.southafrican_adults = 0
    this.sadc_adults = 0
    this.international_adults = 0
    this.southafrican_children = 0
    this.sadc_children = 0
    this.international_children = 0
    this.pricing = {
      base_pricing: 2483,
      discount_web: 0,
      community_levy: 0,
      conservation_fees: 0
    }
    this.property_code = 0
    this.type_code = ''
    this.parent = 0
    this.item_type = 0
    this.gmsTimeSlotId = 0
  }
}
