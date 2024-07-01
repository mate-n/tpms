import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import type { AxiosStatic } from 'axios'

export class ParkService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<IProtelPark[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/parks')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
