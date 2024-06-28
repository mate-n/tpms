import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import type { AxiosStatic } from 'axios'

export class CampService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<IProtelCamp[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/camps')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
