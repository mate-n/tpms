import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IStationery } from '@/shared/interfaces/IStationery'
import type { AxiosStatic } from 'axios'

export class StationeryService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  get(id: number) {
    return new Promise<IStationery>((resolve, reject) => {
      this.axiosInstance
        .get('v1/stationeries/' + id)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
