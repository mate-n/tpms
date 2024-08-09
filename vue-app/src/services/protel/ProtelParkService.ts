import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import type { IProtelParkSearch } from '@/shared/interfaces/protel/IProtelParkSearch'
import type { AxiosStatic } from 'axios'

export class ProtelParkService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<IProtelPark[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/protel-parks')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(protelParkSearch: IProtelParkSearch) {
    return new Promise<IProtelPark[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/protel-parks/search', protelParkSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
