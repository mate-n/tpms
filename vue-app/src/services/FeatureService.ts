import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IFeature } from '@/shared/interfaces/IFeature'
import type { AxiosStatic } from 'axios'

export class FeatureService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
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
