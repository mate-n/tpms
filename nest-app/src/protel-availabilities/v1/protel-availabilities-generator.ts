import { v4 as uuidv4 } from 'uuid'

export class ProtelAvailabilitiesGenerator {
  generateAvailabilities(startDate, endDate) {
    const availabilities = []
    const currentDate = new Date(startDate)
    endDate = new Date(endDate)
    while (currentDate <= endDate) {
      const availabilityStartString =
        this.generateDateStringForAvailability(currentDate)

      const room_rate = Math.floor(Math.random() * 1000) + 1000
      for (const roomTypeCode of this.listOfRoomTypeCodes) {
        const availability = this.generateAvailability(
          roomTypeCode,
          availabilityStartString,
          room_rate.toString(),
        )
        availabilities.push(availability)
      }

      availabilities.push({
        date: new Date(currentDate),
        availability: 0,
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return availabilities
  }

  generateDateStringForAvailability(date: Date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} 00:00:00`
  }

  listOfRoomTypeCodes = ['CK6', 'CK6P', 'FA2Z', 'FA2/4A', 'FA2/4ZA', 'FA3']

  generateAvailability(
    room_type_code: string,
    availability_start: string,
    room_rate: string,
  ) {
    return {
      id: uuidv4(),
      transaction_id: '46f47d4b-9781-4bf3-8e72-8d4b95dd3eac',
      unique_message_id: '498d0657-06a4-402e-9678-0ea49af15be2',
      request_id: '46f47d4b-9781-4bf3-8e72-8d4b95dd3eac',
      date_time: '2024-06-21 09:00:05',
      pms_type: 'SaaS',
      property_code: '19325',
      type: 'FullExport',
      room_type_code: room_type_code,
      default_occupancy: '1',
      max_occupancy: '4',
      availability_start: availability_start, //'2025-03-13 00:00:00',
      availability_end: availability_start, //'2025-03-13 00:00:00',
      availability_count: '6',
      park_name: 'Kgalagadi Transfrontier National Park',
      property_name: 'Twee Riveren',
      room_type_name: 'acc',
      features: '',
      rates_data: [
        {
          rates_code: 'RACK',
          occupancy: '3',
          room_rate: room_rate,
          add_on_child1: '0.000',
        },
      ],
    }
  }
}
