export class RoomHelper {
  generateCloneRoomTypeCode(roomTypeCode: string) {
    if (!roomTypeCode) return ''
    return `${roomTypeCode}_${String(Date.now())}`
  }
  checkCloneRoomTypeCode(roomTypeCode?: string) {
    if (!roomTypeCode) return false
    return /_[0-9]+$/.test(roomTypeCode)
  }
  removeCloneRoomTypeCodeSuffix(roomTypeCode?: string) {
    return (roomTypeCode || '').replace(/_[0-9]+$/, '')
  }
}
