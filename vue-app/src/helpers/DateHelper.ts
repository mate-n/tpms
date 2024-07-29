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

  /**
   * Check if d1 is after d2
   * @param d1
   * @param d2
   */
  isAfter(d1: Date, d2: Date): boolean {
    const date1 = new Date(d1)
    date1.setHours(0, 0, 0, 0)
    const date2 = new Date(d2)
    date2.setHours(0, 0, 0, 0)
    return date1.getTime() > date2.getTime()
  }

  isSameDay(d1: Date, d2: Date) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  isDateBetweenDatesOld(date: Date, startDate: Date, endDate: Date) {
    return date >= startDate && date <= endDate
  }

  isDateBetweenDates(date: Date, startDate: Date, endDate: Date) {
    if (this.isSameDay(date, startDate) || this.isSameDay(date, endDate)) {
      return true
    }
    return date >= startDate && date <= endDate
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

  getTodayDate(): Date {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  }

  getNameOfDay(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[date.getDay()]
  }
}
