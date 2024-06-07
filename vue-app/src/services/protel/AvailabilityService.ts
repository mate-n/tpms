import type { IParksAndCamps } from '@/interfaces/protel/IParksAndCamps'
import axios from 'axios'

export class AvailabilityService {
  getParksAndCamps(): Promise<IParksAndCamps> {
    return new Promise<any>((resolve, reject) => {
      let data = ''

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://ankerws.ankerdata.co.za/getparksandcamps/index.php',
        headers: {
          Authorization: 'Bearer 1234567890'
        },
        data: data
      }

      axios
        .request(config)
        .then((response: any) => {
          console.log(JSON.stringify(response.data))
          resolve(response.data)
        })
        .catch((error: any) => {
          console.log(error)
        })
    })
  }
}