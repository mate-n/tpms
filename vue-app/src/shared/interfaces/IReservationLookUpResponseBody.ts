export interface IReservationLookUpResponseBody {
  reservationNo: number
  crsNo: string
  profileId: number
  reservationStatus: string
  arrivalDate: string
  departureDate: string
  reservationTotal: string
  propertyID: number
  depositDeadline1date: string
  depositDeadline1amount: string
  depositDeadline1per: string
  depositDeadline2date: any
  depositDeadline2amount: any
  depositDeadline2per: any
  depositDeadline3date: any
  depositDeadline3amount: any
  depositDeadline3per: any
  rate_code: string
  type_code: string
}
