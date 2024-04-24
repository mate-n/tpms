import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IAvailabilityPostBody } from '@/interfaces/availability/IAvailabilityPostBody'
import type { IService } from '@/interfaces/IService'
import type { IUnitAvailabilityPostBody } from '@/interfaces/availability/IUnitAvailabilityPostBody'
import type { AxiosStatic } from 'axios'

class AvailabilityService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailability(availabilityPostBody: IAvailabilityPostBody) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('v1/properties/1/availabilities', availabilityPostBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  getUnitAvailability(unitAvailabilityPostBody: IUnitAvailabilityPostBody) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post('getunitavailability', unitAvailabilityPostBody)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default AvailabilityService
