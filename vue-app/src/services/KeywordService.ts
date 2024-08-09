import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IKeyword } from '@/shared/interfaces/IKeyword'
import type { AxiosStatic } from 'axios'
import { inject } from 'vue'
const axios2: AxiosStatic | undefined = inject('axios2')

export class KeywordService implements IService {
  axiosInstance: any
  constructor() {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios2)
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
