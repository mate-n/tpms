import type { ICartItem } from './ICartItem'

export interface IRetrieveCartResponseBody {
  cart: ICart
  cart_items: ICartItem[]
}

export interface ICart {
  cart_id: number
  unique_number: string
  creation_datetime: string
  profile_number: any
  cart_type: number
  status: string
  payment_ref: any
  payment_amount: any
  payment_method: any
}
