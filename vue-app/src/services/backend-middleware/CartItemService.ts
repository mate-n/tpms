import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import type { ICartItem } from '@/shared/interfaces/cart/ICartItem'
import type { IRetrieveCartBody } from '@/shared/interfaces/cart/IRetrieveCartBody'
import type { IUpdateItemInCartBody } from '@/shared/interfaces/cart/IUpdateItemInCartBody'

export class CartItemService implements IService {
  axiosInstance: any
  constructor() {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(undefined)
  }

  addItemToCart(addItemToCartBody: IAddItemToCartBody) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/add-item', { ...addItemToCartBody, action: 'add' })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  updateItemInCart(updateItemInCartBody: IUpdateItemInCartBody) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/update-item', { ...updateItemInCartBody, action: 'edit' })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  removeItemFromCart(id: number) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/remove-item', { id, action: 'delete' })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  getItemsInCart(retrieveCartBody: IRetrieveCartBody) {
    return new Promise<ICartItem[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/get-items', retrieveCartBody)
        .then((response: any) => {
          resolve(response.data.cart_items)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
