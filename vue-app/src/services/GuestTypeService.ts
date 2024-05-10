import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IGuestType } from '@/shared/interfaces/IGuestType'
import type { AxiosStatic } from 'axios'

export class GuestTypeService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableGuestTypes() {
    return new Promise<IGuestType[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/guest-types')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
