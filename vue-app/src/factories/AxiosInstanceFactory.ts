import axios, { type AxiosStatic } from 'axios'

export class AxiosInstanceFactory {
  static createAxiosInstance(axiosInstance: AxiosStatic | undefined) {
    if (!axiosInstance) {
      axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
      axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      return axios
    } else {
      return axiosInstance
    }
  }
}
