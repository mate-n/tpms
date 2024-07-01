import type { AxiosStatic } from 'axios'

export class AxiosHelper {
  switchBaseUrl(axiosInstance: AxiosStatic, apiSwitch: boolean) {
    if (apiSwitch) {
      axiosInstance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL2
    } else {
      axiosInstance.defaults.baseURL = import.meta.env.VITE_API_BASE_URL2 + 'fake/'
    }
  }

  isFakeApi(axiosInstance: AxiosStatic) {
    if (axiosInstance.defaults.baseURL && axiosInstance.defaults.baseURL.includes('fake')) {
      return true
    }
    return false
  }
}
