export class SAIDPassportHelper {
  generateStartOfSAIDNumber(dateOfBirth: Date) {
    const yy = dateOfBirth.getFullYear().toString().slice(-2)
    const mm = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const dd = dateOfBirth.getDate().toString().padStart(2, '0')
    const digitafterFirst6Digits = 5
    return yy + mm + dd + digitafterFirst6Digits
  }

  extractBirthdateFromSAIDNumber(said: string): Date {
    const dateOfBirth = new Date()
    const yy = parseInt(said.slice(0, 2))
    const mm = said.slice(2, 4)
    const dd = said.slice(4, 6)
    if (yy > 13) {
      dateOfBirth.setFullYear(1900 + yy)
    } else {
      dateOfBirth.setFullYear(2000 + yy)
    }
    dateOfBirth.setMonth(parseInt(mm) - 1)
    dateOfBirth.setDate(parseInt(dd))
    return dateOfBirth
  }

  extractGenderFromSAIDNumber(said: string): string {
    const genderNumber = said.slice(6, 10)
    if (parseInt(genderNumber) < 5000) {
      return 'FEMALE'
    }
    return 'MALE'
  }
}
