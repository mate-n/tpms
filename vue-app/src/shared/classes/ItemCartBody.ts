import type { IPricing } from '../interfaces/cart/IPricing'
import type { IItemCartBody } from '../interfaces/cart/IItemCartBody'

export class ItemCartBody implements IItemCartBody {
  action: 'add' | 'edit' | 'delete' | ''
  cart_id: string
  cart_item_id: number
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

  constructor(data?: Partial<IItemCartBody>) {
    this.action = data?.action || ''
    this.cart_id = data?.cart_id || ''
    this.cart_item_id = data?.cart_item_id || 0
    this.arrival_date = data?.arrival_date || ''
    this.departure_date = data?.departure_date || ''
    this.adults = data?.adults || 0
    this.children = data?.children || 0
    this.units = data?.units || 0
    this.conservation_fees = data?.conservation_fees || 0
    this.southafrican_adults = data?.southafrican_adults || 0
    this.sadc_adults = data?.sadc_adults || 0
    this.international_adults = data?.international_adults || 0
    this.southafrican_children = data?.southafrican_children || 0
    this.sadc_children = data?.sadc_children || 0
    this.international_children = data?.international_children || 0
    this.pricing = {
      base_pricing: data?.pricing?.base_pricing || 0,
      discount_web: data?.pricing?.discount_web || 0,
      community_levy: data?.pricing?.community_levy || 0,
      conservation_fees: data?.pricing?.conservation_fees || 0
    }
    this.property_code = data?.property_code || 0
    this.type_code = data?.type_code || ''
    this.parent = data?.parent || 0
    this.item_type = data?.item_type || 0
    this.gmsTimeSlotId = data?.gmsTimeSlotId || 0
  }
}
