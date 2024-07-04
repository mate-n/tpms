export class SAIDPassportHelper {
  generateStartOfSAIDNumber(dateOfBirth: Date) {
    const yy = dateOfBirth.getFullYear().toString().slice(-2)
    const mm = (dateOfBirth.getMonth() + 1).toString().padStart(2, '0')
    const dd = dateOfBirth.getDate().toString().padStart(2, '0')
    const digitafterFirst6Digits = 5
    return yy + mm + dd + digitafterFirst6Digits
  }
}
