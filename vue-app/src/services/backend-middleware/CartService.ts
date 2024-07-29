import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { ICartItem } from '@/shared/interfaces/cart/ICartItem'
import type { IRemoveItemFromCartBody } from '@/shared/interfaces/cart/IRemoveItemFromCartBody'
import type { IRetrieveCartBody } from '@/shared/interfaces/cart/IRetrieveCartBody'
import type { IRetrieveCartResponseBody } from '@/shared/interfaces/cart/IRetrieveCartResponseBody'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
import type { IUpdateItemInCartBody } from '@/shared/interfaces/cart/IUpdateItemInCartBody'
import type { AxiosStatic } from 'axios'

export class CartService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  createCart(cartBody: ICartBody) {
    return new Promise<CreateCartResponseBody>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart', cartBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  updateCart(cartBody: IUpdateCartBody) {
    return new Promise<CreateCartResponseBody>((resolve, reject) => {
      this.axiosInstance
        .put('api/v1/cart', cartBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  addItemToCart(addItemToCartBody: IAddItemToCartBody) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/add-item', addItemToCartBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  removeItemFromCart(removeItemFromCartBody: IRemoveItemFromCartBody) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/remove-item', removeItemFromCartBody)
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

  deleteItemFromCart(removeItemFromCartBody: IRemoveItemFromCartBody) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/delete-item', removeItemFromCartBody)
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
        .post('api/v1/cart/update-item', updateItemInCartBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  settleCart(settleCartBody: ISettleCartBody) {
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/settle', settleCartBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  retrieveCart(cart_number: string) {
    return new Promise<IRetrieveCartResponseBody | undefined>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/retrieve', {
          cart_number: cart_number
        })
        .then((response: any) => {
          if (response.data['error']) {
            resolve(undefined)
          } else {
            resolve(response.data)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
