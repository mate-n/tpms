export interface ITicket {
  TicketId: number
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
}
