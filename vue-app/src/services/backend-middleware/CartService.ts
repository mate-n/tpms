import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
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
    return new Promise<any>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/cart/retrieve', {
          cart_number: cart_number
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
