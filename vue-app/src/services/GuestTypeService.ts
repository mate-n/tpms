import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IGuestType } from '@/shared/interfaces/IGuestType'
import type { AxiosStatic } from 'axios'

export class GuestTypeService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
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
