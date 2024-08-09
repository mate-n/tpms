import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { ISynchronizeFrontendCartWithBackendCartResult } from '../interfaces/ISynchronizeFrontendCartWithBackendCartResult'

export class SynchronizeFrontendCartWithBackendCartResultErrorMessageGenerator {
  generateErrorMessage(results: ISynchronizeFrontendCartWithBackendCartResult[]): string {
    let errorMessage = 'Following reservations failed: \n'
    const failedResults = results.filter((result) => result.status === 'failed')

    if (failedResults) {
      const failedReservations = failedResults
        .filter((result) => result.interfaceName === 'IProtelReservation')
        .map((result) => result.datum) as IProtelReservation[]

      const failedReservationErrorMessage = failedReservations
        .map((reservation) => ' - ' + reservation.property_name + ': ' + reservation.roomTypeCode)
        .join('\n')

      errorMessage = errorMessage.concat(' ', failedReservationErrorMessage)
      errorMessage = errorMessage.concat(' ', '\nThese reservations have been removed.')
    }
    return errorMessage
  }
}
