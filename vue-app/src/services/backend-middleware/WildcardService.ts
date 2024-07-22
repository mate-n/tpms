import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IWildCardCheckResponseBody } from '@/shared/interfaces/wildcards/IWildCardCheckResponseBody'
import type { AxiosStatic } from 'axios'

export class WildcardService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  checkWildcard(wildcardString: string) {
    return new Promise<IWildCardCheckResponseBody>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/wildcards/check/' + wildcardString)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
