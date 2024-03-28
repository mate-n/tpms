export class DateHelper {
  calculateNightsBetweenDates(arrivalDate: Date, departureDate: Date): number {
    const arrival = new Date(arrivalDate)
    const departure = new Date(departureDate)
    const timeDifference = departure.getTime() - arrival.getTime()
    return Math.ceil(timeDifference / (1000 * 3600 * 24))
  }

  getDateString(date: Date): string {
    const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    return newDate.toISOString().substring(0, 10)
  }

  isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }
}
