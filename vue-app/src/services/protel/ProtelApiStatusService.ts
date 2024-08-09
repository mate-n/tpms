import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'
export class ProtelApiStatusService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
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
