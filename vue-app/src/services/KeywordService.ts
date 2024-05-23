import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IKeyword } from '@/shared/interfaces/IKeyword'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')

export class KeywordService implements IService {
  axiosInstance: AxiosStatic
  constructor() {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
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
