import type { ITicket } from '@/shared/interfaces/ITicket'

export class TicketService {
  getAll() {
    return new Promise<ITicket[]>((resolve, reject) => {
      fetch('https://plankton.mobi/api/events/407185e6-3b8a-4fbf-99c6-d81ce0767b3e/tickets')
        .then((response: any) => {
          response.json().then((data: any) => {
            resolve(data)
          })
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}
