import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'
import type { ICamp } from '@/shared/interfaces/ICamp'
export class CampService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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
}
