import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'
import type { ICamp } from '@/shared/interfaces/ICamp'
import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
export class CampService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<ICamp[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/camps')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  findOne(id: number) {
    return new Promise<ICamp>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/camps/${id}`)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
