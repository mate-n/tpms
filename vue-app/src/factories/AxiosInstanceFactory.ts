import { AuthenticationHelper } from '@/authentication/AuthenticationHelper'
import axios, { type AxiosStatic } from 'axios'

export class AxiosInstanceFactory {
  static createAxiosInstance(axiosInstance: AxiosStatic | undefined) {
    if (!axiosInstance) {
      axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      const authenticationHelper = new AuthenticationHelper()
      const access_token = authenticationHelper.getAccessToken()
      if (access_token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
      }
      return axios
    } else {
      return axiosInstance
    }
  }
}
