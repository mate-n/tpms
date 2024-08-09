export class RoomHelper {
  generateCloneRoomTypeCode(roomTypeCode: string) {
    if (!roomTypeCode) return ''
    return `${roomTypeCode}_${String(Date.now())}`
  }
}
