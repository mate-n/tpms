import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import type { IProfileDocumentSearch } from '@/interfaces/profiles/IProfileDocumentSearch'
import type { AxiosStatic } from 'axios'

export class ProfileDocumentService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }
  search(profileCommunicationSearch: IProfileDocumentSearch) {
    return new Promise<IProfileDocument[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/documents/search', profileCommunicationSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
