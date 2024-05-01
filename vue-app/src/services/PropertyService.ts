import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IProperty } from '@/interfaces/IProperty'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class PropertyService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getProperties() {
    return new Promise<IProperty[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/properties')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  getLocalProperty() {
    return new Promise<IProperty>((resolve, reject) => {
      this.axiosInstance
        .get('v1/properties/local-property')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
