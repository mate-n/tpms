import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import type { IProtelCampSearch } from '@/shared/interfaces/protel/IProtelCampSearch'
import type { AxiosStatic } from 'axios'

export class ProtelCampService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<IProtelCamp[]>((resolve, reject) => {
      this.axiosInstance
        .get('v2/protel-camps')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(protelParkSearch: IProtelCampSearch) {
    return new Promise<IProtelCamp[]>((resolve, reject) => {
      this.axiosInstance
        .post('v2/protel-camps/search', protelParkSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
