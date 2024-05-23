import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IProfileAddress } from '@/shared/interfaces/profiles/IProfileAddress'
import type { IProfileAddressSearch } from '@/shared/interfaces/profiles/IProfileAddressSearch'
import type { IProfilesService } from '@/interfaces/IProfilesService'
import type { AxiosStatic } from 'axios'

export class ProfileAddressService implements IProfilesService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }
  create(profileAddress: IProfileAddress) {
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

  update(profileAddress: IProfileAddress) {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .put(`v1/profiles/addresses/${profileAddress.id}`, profileAddress)
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

  get(id: number) {
    return new Promise<IProfileAddress>((resolve, reject) => {
      this.axiosInstance
        .get(`v1/profiles/addresses/${id}`)
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
        .delete(`v1/profiles/communications/${profileAdress.id}`)
        .then(() => {
          resolve()
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  createOrUpdate(model: IProfileAddress) {
    return new Promise<IProfileAddress>((resolve, reject) => {
      if (model.id) {
        this.update(model)
          .then((response: any) => {
            resolve(response)
          })
          .catch((e: any) => {
            reject(e)
          })
      } else {
        this.create(model)
          .then((response: any) => {
            resolve(response)
          })
          .catch((e: any) => {
            reject(e)
          })
      }
    })
  }
}
