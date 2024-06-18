import type { IGuestsPerRoom } from '@/shared/interfaces/IGuestsPerRoom'

export class GuestsPerRoomHelper {
  getTotalNumberOfGuests(guestsPerRoom: IGuestsPerRoom): number {
    let numberOfGuests = 0
    numberOfGuests += guestsPerRoom.numberOfAdults
    numberOfGuests += guestsPerRoom.numberOfChildren
    numberOfGuests += guestsPerRoom.numberOfInfants
    numberOfGuests += guestsPerRoom.numberOfSeniors
    console.log('numberOfGuests', numberOfGuests)
    return numberOfGuests
  }
}
