import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import { Service } from '../Service'

export class ParkService extends Service {
  findAll() {
    return new Promise<IProtelPark[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/parks')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
