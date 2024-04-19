import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'
import type { IProfileAddressSearch } from '@/interfaces/profiles/IProfileAddressSearch'
import type { AxiosStatic } from 'axios'

export class ProfileAddressService implements IService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }

  getAllByProfileID(profileID: number) {
    return new Promise<IProfileAddress[]>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/profiles/${profileID}/addresses`)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  search(profileAddressSearch: IProfileAddressSearch) {
    return new Promise<IProfileAddress[]>((resolve, reject) => {
      this.axiosInstance
        .post('v1/profiles/addresses/search', profileAddressSearch)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
