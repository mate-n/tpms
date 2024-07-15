import type { ITicket } from '../interfaces/ITicket'

export class Ticket implements ITicket {
  TicketId: string
  Name: string
  Price: number
  MaxPerTransaction: number
  MinPerTransaction: number
  MaxPerCustomer: number
  MinPerCustomer: number
  TotalTickets: number
  Description: string
  LongDescription: string
  AvailableTickets: number
  TicketEventId: number
  TicketEventName: string
  DisplayOrder: number
  TagType: string
  TicketTagValues: string[]
  AvailableOn: number
  Status: string
  TicketType: string
  MappingId: number
  ItemCode: string
  Category: string
  MaxSales: number
  RemainingCapacity: number
  EventMaxCapacity: number
  EventRemainingCapacity: number
  Date: Date

  constructor() {
    this.TicketId = '0'
    this.Name = ''
    this.Price = 0
    this.MaxPerTransaction = 0
    this.MinPerTransaction = 0
    this.MaxPerCustomer = 0
    this.MinPerCustomer = 0
    this.TotalTickets = 0
    this.Description = ''
    this.LongDescription = ''
    this.AvailableTickets = 0
    this.TicketEventId = 0
    this.TicketEventName = ''
    this.DisplayOrder = 0
    this.TagType = ''
    this.TicketTagValues = []
    this.AvailableOn = 0
    this.Status = ''
    this.TicketType = ''
    this.MappingId = 0
    this.ItemCode = ''
    this.Category = ''
    this.MaxSales = 0
    this.RemainingCapacity = 0
    this.EventMaxCapacity = 0
    this.EventRemainingCapacity = 0
    this.Date = new Date()
  }
}
