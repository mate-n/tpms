export interface ISynchronizeFrontendCartWithBackendCartResult {
  status: string
  message: string
  interfaceName: string
  datum: any
  localID: string | undefined
  cart_item_id: number
  crs: string
  confirmation: string
}
