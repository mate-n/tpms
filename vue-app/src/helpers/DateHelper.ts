export class DateHelper {
  calculateNightsBetweenDates(arrivalDate: Date, departureDate: Date): number {
    const arrival = new Date(arrivalDate)
    const departure = new Date(departureDate)
    const timeDifference = departure.getTime() - arrival.getTime()
    return Math.ceil(timeDifference / (1000 * 3600 * 24))
  }
}
