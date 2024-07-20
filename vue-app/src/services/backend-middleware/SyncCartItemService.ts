import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IService } from '@/interfaces/IService'
import type { IProtelReservation } from '../reservations/IProtelReservation'
import { ItemCartBody } from '@/shared/classes/ItemCartBody'
import { CartItemService } from './CartItemService'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'

export class SyncCartItemService implements IService {
  axiosInstance: any
  dateFormatter = new DateFormatter()
  cartItemService = new CartItemService()
  itineraryReservationCartStore = useItineraryReservationCartStore()
  constructor() {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(undefined)
  }

  mapItemCartBody(reservation: IProtelReservation, itemData?: Partial<ItemCartBody>) {
    const cartId = this.itineraryReservationCartStore.getCartNumber()
    if (!cartId) throw Error('Missing cart_id')

    return new ItemCartBody({
      cart_id: cartId,
      cart_item_id: reservation.cartITemID || 0,
      arrival_date: this.dateFormatter.yyyydashmmdashdd(reservation.arrivalDate),
      departure_date: this.dateFormatter.yyyydashmmdashdd(reservation.departureDate),
      adults: 1,
      children: 0,
      units: reservation.numberOfRooms,
      item_type: 1,
      pricing: {
        base_pricing: parseInt(reservation.rate.value),
        discount_web: 0,
        community_levy: 0,
        conservation_fees: 0
      },
      type_code: reservation.roomTypeCode || '',
      property_code: reservation.property_code ? parseInt(reservation.property_code) : 0,
      ...itemData
    })
  }

  async syncItemToCart(
    action: 'add' | 'edit' | 'delete',
    reservation: IProtelReservation,
    itemData?: Partial<Omit<ItemCartBody, 'action'>>
  ) {
    if (action === 'add') {
      const item = this.mapItemCartBody(reservation, itemData)
      const response = await this.cartItemService.addItemToCart(item)
      return response
    }

    if (action === 'edit') {
      const item = this.mapItemCartBody(reservation, itemData)
      const response = await this.cartItemService.updateItemInCart(item)
      return response
    }

    if (action === 'delete') {
      if (!reservation.cartITemID) throw Error('Missing "cartItemID"')
      const response = await this.cartItemService.removeItemFromCart(reservation.cartITemID)
      return response
    }
  }
}
