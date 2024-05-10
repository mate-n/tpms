import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { ISalutation } from '@/shared/interfaces/ISalutation'
import type { AxiosStatic } from 'axios'

export class SalutationService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableSalutations() {
    return new Promise<ISalutation[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/salutations')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
