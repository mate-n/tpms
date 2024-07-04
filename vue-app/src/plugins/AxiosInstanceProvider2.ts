import { AxiosInstanceFactory2 } from '../factories/AxiosInstanceFactory2'

export default {
  install: (app: any) => {
    const axiosInstance = AxiosInstanceFactory2.createAxiosInstance(undefined)
    app.provide('axios2', axiosInstance)
  }
}
