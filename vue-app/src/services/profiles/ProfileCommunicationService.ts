import { type AxiosStatic } from 'axios'
import { AxiosInstanceFactory } from '../../factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import type { IProfileCommunicationSearch } from '@/interfaces/profiles/IProfileCommunicationSearch'

class ProfileCommunicationService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  search(profileCommunicationSearch: IProfileCommunicationSearch) {
    return new Promise<IProfileCommunication[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/communications/search', profileCommunicationSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default ProfileCommunicationService
