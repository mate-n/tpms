export interface IPropertyAvailabilitySearch {
  propertyID: number
  availabilityStart: Date
  availabilityEnd: Date
  numberOfRooms?: number
  roomID?: number
  profileID?: number
}
