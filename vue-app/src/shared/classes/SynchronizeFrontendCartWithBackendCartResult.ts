import type { ISynchronizeFrontendCartWithBackendCartResult } from '../interfaces/ISynchronizeFrontendCartWithBackendCartResult'

export class SynchronizeFrontendCartWithBackendCartResult
  implements ISynchronizeFrontendCartWithBackendCartResult
{
  status: string
  message: string
  interfaceName: string
  datum: any
  localID: string | undefined
  cart_item_id: number
  crs: string
  confirmation: string

  constructor() {
    this.status = ''
    this.message = ''
    this.interfaceName = ''
    this.cart_item_id = 0
    this.crs = ''
    this.confirmation = ''
  }
}
