import type { ITicket } from '@/shared/interfaces/ITicket'

export class TicketHelper {
  getTotalPrice(tickets: ITicket[]): number {
    let total = 0
    for (const ticket of tickets) {
      total += ticket.Price
    }
    return total
  }

  groupTicketsByTicketId(selectedTickets: ITicket[]): Map<number, ITicket[]> {
    const grouped = new Map<number, ITicket[]>()
    for (const ticket of selectedTickets) {
      if (!grouped.has(ticket.TicketId)) {
        grouped.set(ticket.TicketId, [])
      }
      grouped.get(ticket.TicketId)?.push(ticket)
    }
    const sortedMap = new Map([...grouped.entries()].sort())
    return sortedMap
  }
}
