import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IGuestMarketCode } from '@/shared/interfaces/IGuestMarketCode'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios2: AxiosStatic | undefined = inject('axios2')

export class GuestMarketCodeService implements IService {
  axiosInstance: any
  constructor() {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios2)
  }

  getAvailableMarketCodes() {
    return new Promise<IGuestMarketCode[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/guest-market-codes')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
