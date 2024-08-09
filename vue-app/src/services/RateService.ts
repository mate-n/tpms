import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IRate } from '@/shared/interfaces/IRate'
import type { AxiosStatic } from 'axios'

export class RateService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
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
