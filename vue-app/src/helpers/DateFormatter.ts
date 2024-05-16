export class DateFormatter {
  dddotmmdotyyyy(dateInput: Date) {
    const date = new Date(dateInput)
    return (
      this.addZeroPadding(date.getDate()) +
      '.' +
      this.addZeroPadding(date.getMonth() + 1) +
      '.' +
      date.getFullYear()
    )
  }

  hhsemicolonmm(dateInput: Date) {
    const date = new Date(dateInput)
    return this.addZeroPadding(date.getHours()) + ':' + this.addZeroPadding(date.getMinutes())
  }

  addZeroPadding(number: number) {
    return ('0' + number).slice(-2)
  }
}
