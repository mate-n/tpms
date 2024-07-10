import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import { Service } from '../Service'

export class CampService extends Service {
  findAll() {
    return new Promise<IProtelCamp[]>((resolve, reject) => {
      this.axiosInstance
        .get('api/v1/camps')
        .then((response: any) => {
          resolve(response.data)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
