import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'
import type { IProfileAddressSearch } from '@/interfaces/profiles/IProfileAddressSearch'
import type { IProfilesService } from '@/interfaces/profiles/IProfilesService'
import type { AxiosStatic } from 'axios'

export class ProfileAddressService implements IProfilesService {
  axiosInstance: AxiosStatic
  constructor(axiosInstance: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axiosInstance)
  }
  post(profileAddress: IProfileAddress) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .post(`v1/profiles/addresses`, profileAddress)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  put(profileAddress: IProfileAddress) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(`v1/profiles/${profileAddress.profileID}/addresses`, profileAddress)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
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

  get(profileID: number, id: number) {
    return new Promise<IProfileAddress>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/profiles/${profileID}/addresses/${id}`)
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

  delete(profileAdress: IProfileAddress) {
    return new Promise<void>((resolve, reject) => {
      this.axiosInstance
        .delete(`v1/profiles/${profileAdress.profileID}/communications/${profileAdress.id}`)
        .then(() => {
          resolve()
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
