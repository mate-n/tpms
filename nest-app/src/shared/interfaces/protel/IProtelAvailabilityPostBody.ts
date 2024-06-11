export interface IProtelAvailabilityPostBody {
  arrivaldate: Date
  departuredate: Date
  roomtype: string | null
  propertyid: number
  detail: string
  accomodation_type: string | null
}
