import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IBookableObject } from '@/shared/interfaces/IBookableObject'
import type { AxiosStatic } from 'axios'

export class BookableObjectService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableBookableObjects() {
    return new Promise<IBookableObject[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/bookable-objects')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
