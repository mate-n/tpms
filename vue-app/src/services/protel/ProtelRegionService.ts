import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import type { AxiosStatic } from 'axios'

export class ProtelRegionService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<IProtelRegion[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/protel-regions')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
