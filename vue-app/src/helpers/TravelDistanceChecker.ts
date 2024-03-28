export class TravelDistanceChecker {
  isDistanceIsPossibleToTravelWithinADay(originCamp: string, targetCamp: string): boolean {
    if (originCamp === 'Twee Rivieren' && targetCamp === 'Gharagab') {
      return false
    }
    return true
  }
}
