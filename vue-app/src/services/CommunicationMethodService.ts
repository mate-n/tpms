import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { ICommunicationMethod } from '@/interfaces/ICommunicationMethod'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class CommunicationMethodService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableCommunicationMethods() {
    return new Promise<ICommunicationMethod[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/communication-methods')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
