import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
import { type AxiosStatic } from 'axios'

export class AvailabilityService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  search(protelAvailabilityPostBody: IProtelAvailabilityPostBody): Promise<IProtelAvailability[]> {
    return new Promise<IProtelAvailability[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/protel-availabilities/search', protelAvailabilityPostBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
