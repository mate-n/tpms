import { Ticket } from '../classes/Ticket'
import type { IActivity } from '../interfaces/IActivity'
import type { ITicket } from '../interfaces/ITicket'

export class TicketsConverter {
  convertToTicket(activity: IActivity): ITicket {
    const ticket: ITicket = new Ticket()
    ticket.Date = new Date(activity.EventDate)
    ticket.Description = activity.Description
    ticket.Name = activity.Name
    if (activity.tickets.length > 0) {
      ticket.Price = activity.tickets[0].Price
      ticket.TicketId = activity.tickets[0].TicketId
      ticket.AvailableTickets = activity.tickets[0].AvailableTickets
    }
    return ticket
  }
}
