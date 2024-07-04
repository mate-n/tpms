import { AxiosInstanceFactory } from '@/factories/AxiosInstanceFactory'
import type { IService } from '@/interfaces/IService'
import type { IAccessToken } from '@/shared/interfaces/IAccessToken'
import type { AxiosStatic } from 'axios'

class AuthenticationService implements IService {
  axiosInstance: AxiosStatic
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory.createAxiosInstance(axios)
  }

  login(username: string, password: string) {
    return new Promise<IAccessToken>((resolve, reject) => {
      this.axiosInstance
        .post('auth/login', {
          username: username,
          password: password
        })
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }

  isLoggedIn() {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('auth/loggedIn')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }
}

export default AuthenticationService
