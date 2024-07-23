import type { ITicket } from '@/shared/interfaces/ITicket'
import { DateFormatter } from './DateFormatter'

export class TicketHelper {
  dateFormatter = new DateFormatter()
  getTotalPrice(tickets: ITicket[]): number {
    let total = 0
    for (const ticket of tickets) {
      total += ticket.Price
    }
    return total
  }

  groupTicketsByTicketId(selectedTickets: ITicket[]): Map<string, ITicket[]> {
    const grouped = new Map<string, ITicket[]>()
    for (const ticket of selectedTickets) {
      if (!grouped.has(ticket.TicketId)) {
        grouped.set(ticket.TicketId, [])
      }
      grouped.get(ticket.TicketId)?.push(ticket)
    }
    const sortedMap = new Map([...grouped.entries()].sort())
    return sortedMap
  }

  groupTicketsByTicketIdAndDate(selectedTickets: ITicket[]): Map<string, Map<string, ITicket[]>> {
    const grouped = new Map<string, Map<string, ITicket[]>>()
    for (const ticket of selectedTickets) {
      if (!grouped.has(ticket.TicketId)) {
        grouped.set(ticket.TicketId, new Map<string, ITicket[]>())
      }
      const ticketMap = grouped.get(ticket.TicketId)
      if (ticketMap) {
        if (!ticketMap.has(this.dateFormatter.dddotmmdotyyyy(ticket.Date))) {
          ticketMap.set(this.dateFormatter.dddotmmdotyyyy(ticket.Date), [])
        }
        ticketMap.get(this.dateFormatter.dddotmmdotyyyy(ticket.Date))?.push(ticket)
      }
    }
    return grouped
  }
}
