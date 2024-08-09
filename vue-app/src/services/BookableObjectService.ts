import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IBookableObject } from '@/shared/interfaces/IBookableObject'
import type { AxiosStatic } from 'axios'

export class BookableObjectService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
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
