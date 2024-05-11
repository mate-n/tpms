import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { ICommunicationMethod } from '@/shared/interfaces/ICommunicationMethod'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

export class CommunicationMethodService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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

  get(id: number) {
    return new Promise<ICommunicationMethod>((resolve, reject) => {
      this.axiosInstance
        .get('v1/profiles/communications/' + id)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
