import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IFeature } from '@/interfaces/IFeature'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class FeatureService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableFeatures() {
    return new Promise<IFeature[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/available-features')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
