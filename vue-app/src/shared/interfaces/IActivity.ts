export interface IActivity {
  EventId: string
  Name: string
  ParentEventId: string
  EventType: string
  EventDate: string
  Venue: string
  Province: any
  CreatedOn: string
  Description: string
  Status: string
  VoluntaryRefundFee: number
  RefundFee: number
  MaxCapacity: number
  RemainingCapacity: number
  VenueId: string
  RestCamp: string
  PropertyId: string
  Notes: any
  ResortCode: string
  Timeslots: boolean
  ImgHeader: string
  ImgSquare: string
  ImgePoster: string
  ImgThumb: string
  tickets: Ticket[]
}

export interface Ticket {
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
  TicketEventId: string
  TicketEventName: string
  DisplayOrder: number
  TagType: string
  AvailableOn: number
  Status: string
  TicketType: string
  MappingId: string
  ItemCode: string
  Category: string
  MaxSales: number
  RemainingCapacity: number
  EventMaxCapacity: number
  EventRemainingCapacity: number
  AccomodationRequirement: string
  PackageContent: PackageContent[]
  LedgerCode: string
}

export interface PackageContent {
  TicketId: string
  TicketName: string
  Price: number
  ItemCode: string
  IgnoreCapacity: boolean
}
