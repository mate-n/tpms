import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IGuestMarketCode } from '@/shared/interfaces/IGuestMarketCode'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

export class GuestMarketCodeService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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
