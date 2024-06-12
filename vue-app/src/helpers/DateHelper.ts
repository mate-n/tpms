import { DateFormatter } from './DateFormatter'

export class DateHelper {
  dateFormatter = new DateFormatter()
  calculateNightsBetweenDates(arrivalDate: Date, departureDate: Date): number {
    const arrival = new Date(arrivalDate)
    const departure = new Date(departureDate)
    const timeDifference = departure.getTime() - arrival.getTime()
    return Math.ceil(timeDifference / (1000 * 3600 * 24))
  }

  getDateStringForInput(date: Date): string {
    return this.dateFormatter.yyyydashmmdashdd(date)
  }

  getDateString(inputDate: Date): string {
    const date = new Date(inputDate)
    return this.dateFormatter.dddotmmdotyyyy(date)
  }

  isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  addDays(date: Date, days: number) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }

  getYYYYMMDDFromDate(date: Date): string {
    const dateISOString = date.toISOString()
    return dateISOString.substring(0, dateISOString.indexOf('T'))
  }

  getTimeFromDate(date: Date): string {
    const dateISOString = date.toISOString()
    return dateISOString.substring(dateISOString.indexOf('T') + 1, dateISOString.length - 1)
  }
}
