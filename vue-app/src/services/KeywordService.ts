import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IKeyword } from '@/interfaces/IKeyword'
import type { IService } from '@/interfaces/IService'
import type { AxiosStatic } from 'axios'

export class KeywordService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAvailableKeywords() {
    return new Promise<IKeyword[]>((resolve, reject) => {
      this.axiosInstance
        .get('v1/dropdowns/keywords')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
