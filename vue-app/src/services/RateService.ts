import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IRate } from '@/shared/interfaces/IRate'
import type { AxiosStatic } from 'axios'

export class RateService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableRates() {
    return new Promise<IRate[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/rates')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
