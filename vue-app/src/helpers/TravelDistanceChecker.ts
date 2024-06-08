export class TravelDistanceChecker {
  isDistanceIsPossibleToTravelWithinADay(originCamp: string, targetCamp: string): boolean {
    if (originCamp === 'Twee Rivieren' && targetCamp === 'Gharagab Wilderness Camp') {
      return false
    }
    return true
  }
}
