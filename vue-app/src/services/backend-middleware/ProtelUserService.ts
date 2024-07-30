import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IProtelUser } from '@/shared/interfaces/IProtelUser'
import type { AxiosStatic } from 'axios'

export class ProtelUserService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  findAll() {
    return new Promise<IProtelUser[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/protel-users')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  findByEmail(email: string) {
    return new Promise<IProtelUser[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/protel-users/find-by-email', { email: email })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }

  wipeAndCreateMany(protelUsers: IProtelUser[]) {
    return new Promise<IProtelUser[]>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/protel-users/wipe-and-create-many', protelUsers)
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
