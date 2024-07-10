import axios, { type AxiosStatic } from 'axios'
import { AuthenticationHelper } from '@/authentication/AuthenticationHelper'

export class Service {
  axiosInstance: AxiosStatic
  oldAxiosInstance: AxiosStatic

  constructor() {
    this.initAxiosInstance()
    this.initOldAxiosInstance()
  }

  initAxiosInstance() {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL2
    })
    axiosInstance.defaults.headers.post['Content-Type'] = 'application/json'
    this.axiosInstance = axiosInstance
  }

  initOldAxiosInstance() {
    const oldAxiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL
    })
    oldAxiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    const authenticationHelper = new AuthenticationHelper()
    const access_token = authenticationHelper.getAccessToken()
    if (access_token) {
      oldAxiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    }
    this.oldAxiosInstance = oldAxiosInstance
  }
}
