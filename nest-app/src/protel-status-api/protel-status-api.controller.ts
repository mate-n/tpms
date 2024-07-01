import { Controller, Get } from '@nestjs/common'

@Controller('v1/protel-status-api')
export class ProtelStatusApiController {
  @Get()
  GetStatus() {
    return this.GetStatusFromProtel()
  }

  GetStatusFromProtel() {
    return new Promise<string>((resolve) => {
      const myHeaders = new Headers()
      myHeaders.append('Authorization', 'Bearer 1234567890')

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer 1234567890',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        redirect: 'follow' as RequestRedirect,
      }

      fetch(
        'https://ankerws.ankerdata.co.za/availability/index.php?getavailability',
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          resolve(result['status'])
        })
        .catch((error) => console.error(error))
    })
  }
}
