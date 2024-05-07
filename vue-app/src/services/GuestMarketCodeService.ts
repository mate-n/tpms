import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IGuestMarketCode } from '@/shared/interfaces/IGuestMarketCode'
import type { AxiosStatic } from 'axios'

export class GuestMarketCodeService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
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
