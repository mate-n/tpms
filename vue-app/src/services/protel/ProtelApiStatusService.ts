import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'
export class ProtelApiStatusService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  getStatus() {
    return new Promise<string>((resolve) => {
      this.axiosInstance
        .get('v1/protel-status-api')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch(() => {
          resolve('not available')
        })
    })
  }
}
