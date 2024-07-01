import axios, { type AxiosStatic } from 'axios'

export class AxiosInstanceFactory2 {
  static createAxiosInstance(axiosInstance: AxiosStatic | undefined) {
    if (!axiosInstance) {
      const newAxios = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL2
      })
      newAxios.defaults.headers.post['Content-Type'] = 'application/json'
      return newAxios
    } else {
      return axiosInstance
    }
  }
}
