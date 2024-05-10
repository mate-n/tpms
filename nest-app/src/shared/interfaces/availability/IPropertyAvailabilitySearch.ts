export interface IPropertyAvailabilitySearch {
  propertyID: number
  availabilityStart: Date
  availabilityEnd: Date
  numberOfRooms?: number
  roomID?: number
  numberOfGuestsPerRoom?: number
  profileID?: number
}
