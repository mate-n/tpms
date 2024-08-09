import { AxiosInstanceFactory2 } from '@/factories/AxiosInstanceFactory2'
import type { IService } from '@/interfaces/IService'
import type { IAccessToken } from '@/shared/interfaces/IAccessToken'
import type { IUser } from '@/shared/interfaces/IUser'
import type { AxiosStatic } from 'axios'

class AuthenticationService implements IService {
  axiosInstance: any
  constructor(axios: AxiosStatic | undefined) {
    this.axiosInstance = AxiosInstanceFactory2.createAxiosInstance(axios)
  }

  login(username: string, password: string) {
    return new Promise<IAccessToken>((resolve, reject) => {
      this.axiosInstance
        .post('api/v1/authenticate', {
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

  isLoggedIn(): Promise<IUser> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/check-login')
        .then((response: { data: { user: IUser } }) => {
          resolve(response.data.user)
        })
        .catch((error: any) => {
          reject(error)
        })
    })
  }
}

export default AuthenticationService
