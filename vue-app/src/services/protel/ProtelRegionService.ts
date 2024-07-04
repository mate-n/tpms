import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import type { AxiosStatic } from 'axios'

export class ProtelRegionService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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
