import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IFeature } from '@/shared/interfaces/IFeature'
import type { AxiosStatic } from 'axios'

export class FeatureService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  getAvailableFeatures() {
    return new Promise<IFeature[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/features')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
