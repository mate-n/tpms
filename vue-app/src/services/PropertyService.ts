import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProperty } from '@/shared/interfaces/IProperty'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

export class PropertyService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  get(id: number) {
    return new Promise<IProperty>((resolve, reject) => {
      this.axiosInstance
        .get('v1/properties/' + id)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
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
