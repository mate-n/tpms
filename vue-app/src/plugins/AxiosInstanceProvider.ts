import { AxiosInstanceFactory } from '../factories/AxiosInstanceFactory'

export default {
  install: (app: any) => {
    const axiosInstance = AxiosInstanceFactory.createAxiosInstance(undefined)
    app.provide('axios', axiosInstance)
  }
}
