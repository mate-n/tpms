import { Ticket } from '../classes/Ticket'
import type { IActivity } from '../interfaces/IActivity'
import type { ITicket } from '../interfaces/ITicket'

export class TicketsConverter {
  convertToTicket(activity: IActivity): ITicket {
    const ticket: ITicket = new Ticket()
    ticket.Date = new Date(activity.date)
    ticket.Description = activity.Description
    ticket.Name = activity.TicketEventName
    ticket.Price = parseInt(activity.Price)
    ticket.TicketId = activity.TicketId
    ticket.AvailableTickets = activity.AvailableTickets
    return ticket
  }
}
