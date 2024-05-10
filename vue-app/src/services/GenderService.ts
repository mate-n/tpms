import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IGender } from '@/shared/interfaces/IGender'
import type { AxiosStatic } from 'axios'

export class GenderService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableGenders() {
    return new Promise<IGender[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/genders')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
