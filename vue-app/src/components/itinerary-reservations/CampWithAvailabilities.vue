<script setup lang="ts">
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import { computed, inject, ref, watch, type Ref } from 'vue'
import AvailabilitiesSelecter from '@/components/itinerary-reservations/AvailabilitiesSelecter.vue'
import { DateHelper } from '@/helpers/DateHelper'
import { DateFormatter } from '@/helpers/DateFormatter'
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import type { AxiosStatic } from 'axios'
import { AvailabilityService } from '@/services/backend-middleware/AvailabilityService'
import RoomDetailsCard from '@/components/rooms/RoomDetailsCard.vue'
import type { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import type { IProtelReservationSelectUpdate } from '@/shared/interfaces/IProtelReservationSelectUpdate'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import GuestsPerRoomSelecter from '../selecters/GuestsPerRoomSelecter.vue'
import { GuestsPerRoom } from '@/shared/classes/GuestsPerRoom'
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
import { AvailabilitiesFiller } from '@/helpers/AvailabilitiesFiller'
const availabilitiesFiller = new AvailabilitiesFiller()
const guestsPerRoom: Ref<GuestsPerRoom> = ref(new GuestsPerRoom())
const priceFormatter = new PriceFormatter()
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const axios2: AxiosStatic | undefined = inject('axios2')
const availabilityService = new AvailabilityService(axios2)
const dateHelper = new DateHelper()
const dateFormatter = new DateFormatter()
const availabilityHelper = new AvailabilityHelper()
const emits = defineEmits(['availabilities-selected'])
const props = defineProps({
  camp: { type: Object as () => IProtelCamp, required: true },
  arrivalDate: {
    type: Object as () => Date,
    required: true
  },
  departureDate: { type: Object as () => Date, required: true },
  roomTypeCodes: { type: Object as () => String[], required: false },
  itineraryReservation: { type: Object as () => ItineraryReservation, required: true }
})

const expansionModel = ref<string[] | null>(['availabilities'])
const selectedAvailabilities: Ref<IProtelAvailability[]> = ref([])
const availabilities: Ref<IProtelAvailability[]> = ref([])

const nightsOverviewString = computed(() => {
  const selectedNights = getNumberOfSelectedNights()

  return `${selectedNights} / ${numberOfNights.value}`
})

const getNumberOfSelectedNights = () => {
  let reservationsNights = 0
  for (const availableDate of availableDates.value) {
    if (isDateOccupiedInReservation(availableDate)) {
      reservationsNights++
    }
  }
  return reservationsNights
}

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(props.arrivalDate, props.departureDate)
})

const availableDates = computed(() => {
  const dates = []
  for (let i = 0; i < numberOfNights.value; i++) {
    dates.push(dateHelper.addDays(props.arrivalDate, i))
  }
  return dates
})

const showRoomsInProtelAvailabilitiesSelecter = ref(false)
const availabilityIcon = computed(() => {
  return showRoomsInProtelAvailabilitiesSelecter.value ? 'mdi-chevron-up' : 'mdi-chevron-down'
})

const clickOnPlusButtonInAvailability = () => {
  showRoomsInProtelAvailabilitiesSelecter.value = !showRoomsInProtelAvailabilitiesSelecter.value
}

const isDateOccupiedInReservation = (date: Date) => {
  const reservations = props.itineraryReservation.protelReservations.filter(
    (reservation) => reservation.property_code === props.camp.id.toString()
  )
  for (const reservation of reservations) {
    const nightBeforeDepartureDate = dateHelper.addDays(reservation.departureDate, -1)
    nightBeforeDepartureDate.setHours(23, 59, 59, 999)
    if (dateHelper.isDateBetweenDates(date, reservation.arrivalDate, nightBeforeDepartureDate)) {
      return true
    }
  }
  return false
}

const isDateOccupiedByOtherReservations = (date: Date) => {
  if (isDateOccupiedInReservation(date)) {
    return false
  }
  const otherReservations = props.itineraryReservation.protelReservations.filter(
    (reservation) => reservation.property_code !== props.camp.id.toString()
  )
  for (const reservation of otherReservations) {
    const nightBeforeDepartureDate = dateHelper.addDays(reservation.departureDate, -1)
    nightBeforeDepartureDate.setHours(23, 59, 59, 999)
    if (dateHelper.isDateBetweenDates(date, reservation.arrivalDate, nightBeforeDepartureDate)) {
      return true
    }
  }
  return false
}

const getTotalOfAvailabilityCountOnDate = (date: Date) => {
  const availabilitiesOnDate = availabilityHelper.getAvailabilitiesByDate(
    availabilities.value,
    date
  )
  return availabilityHelper.getTotalOfAvailabilityCount(availabilitiesOnDate)
}

const roomTypeDialog = ref(false)

const getAvailabilities = () => {
  const protelAvailabilityPostBody: IProtelAvailabilityPostBody = availabilityHelper.mapPostBody({
    camp: props.camp,
    arrivalDate: props.arrivalDate,
    departureDate: props.departureDate,
    roomTypeCode: undefined,
    guestsPerRoom: guestsPerRoom.value
  })

  availabilityService.getAvailabilities(protelAvailabilityPostBody).then((response) => {
    if (props.roomTypeCodes && props.roomTypeCodes.length > 0) {
      availabilities.value = response.filter((availability) =>
        props.roomTypeCodes!.includes(availability.room_type_code)
      )
    } else {
      availabilities.value = response
    }
    availabilitiesFiller.addAvailabilitiesOnDaysWhereThereAreNone(
      availabilities.value,
      props.arrivalDate,
      props.departureDate
    )
  })
}

watch(
  [() => props.arrivalDate, () => props.departureDate, () => props.roomTypeCodes],
  async () => {
    getAvailabilities()
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  guestsPerRoom,
  () => {
    getAvailabilities()
  },
  {
    deep: true
  }
)

const availabilitiesSelected = (protelReservationSelectUpdate: IProtelReservationSelectUpdate) => {
  protelReservationSelectUpdate.guestsPerRoom = guestsPerRoom.value
  selectedAvailabilities.value = protelReservationSelectUpdate.selectedAvailabilities
  emits('availabilities-selected', protelReservationSelectUpdate)
}

const clickOnReset = () => {
  const protelReservationSelectUpdate: IProtelReservationSelectUpdate = {
    selectedAvailabilities: [],
    property_code: props.camp.id.toString(),
    roomTypeCode: '',
    guestsPerRoom: guestsPerRoom.value
  }
  emits('availabilities-selected', protelReservationSelectUpdate)
}

const totalPriceForCamp = computed(() => {
  const reservationsInThisCamp = props.itineraryReservation.protelReservations.filter(
    (reservation) => reservation.property_code === props.camp.id.toString()
  )
  let total = 0
  for (const reservation of reservationsInThisCamp) {
    total += protelReservationPriceCalculator.getPriceForAllNights(reservation)
  }
  return priceFormatter.formatPrice(total)
})
</script>
<template>
  <v-container fluid class="bg-white" data-cy="camp_availabilities_container">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <h3>
          <strong data-cy="camp_name">{{ camp.name }}</strong>
        </h3>
      </v-col>
      <v-col>
        <v-text-field
          label="Nights"
          :model-value="nightsOverviewString"
          :readonly="true"
        ></v-text-field>
      </v-col>
      <v-col>
        <GuestsPerRoomSelecter v-model="guestsPerRoom"></GuestsPerRoomSelecter>
      </v-col>
      <v-col>
        <v-btn @click="clickOnReset()">Reset</v-btn>
      </v-col>
      <v-col>
        <v-btn>Total: {{ totalPriceForCamp }}</v-btn>
      </v-col>
    </v-row>

    <v-expansion-panels class="mb-2 mt-2" v-model="expansionModel">
      <v-expansion-panel title="Availabilities" value="availabilities">
        <v-expansion-panel-text>
          <v-table>
            <thead>
              <tr class="bg-lightblue">
                <th class="" style="width: 15rem"></th>

                <th class="d-flex">
                  <div
                    v-for="date of availableDates"
                    :key="date.toISOString()"
                    class="text-center availability-box-width"
                  >
                    {{ dateHelper.getNameOfDay(date) }}<br />
                    {{ dateFormatter.dddotmm(date) }}
                  </div>
                </th>

                <template v-if="availabilities.length === 0">
                  <th v-for="i in 12" :key="i"></th>
                </template>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="d-flex justify-space-between align-center">
                  <v-btn
                    variant="text"
                    icon
                    @click="clickOnPlusButtonInAvailability()"
                    data-cy="expand_avalabilities_button"
                  >
                    <v-icon class="text-primary">
                      {{ availabilityIcon }}
                    </v-icon></v-btn
                  >

                  Availibility (incl. OB)
                </td>
                <td class="bg-lightgray">
                  <div class="d-flex">
                    <div
                      v-for="date of availableDates"
                      :key="date.toISOString()"
                      class="text-center availability-box-width"
                      :class="{
                        'bg-light-blue-lighten-4': isDateOccupiedInReservation(date),
                        'bg-orange-lighten-4': isDateOccupiedByOtherReservations(date)
                      }"
                    >
                      <div class="availability-inner-box">
                        {{ getTotalOfAvailabilityCountOnDate(date) }}
                      </div>
                    </div>
                  </div>
                </td>
                <template v-if="availabilities.length === 0">
                  <td v-for="i in 12" :key="i" class="bg-lightgray">
                    <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
                      <v-icon>mdi-circle-small</v-icon>
                    </div>
                  </td>
                </template>
              </tr>
              <tr
                v-for="roomTypeCode of availabilityHelper.getUniqueRoomTypeCodes(availabilities)"
                :key="roomTypeCode"
              >
                <td v-if="showRoomsInProtelAvailabilitiesSelecter">
                  <div class="d-flex justify-space-between">
                    <div data-cy="avalibility_room_type_code">{{ roomTypeCode }}</div>
                    <div>
                      <v-btn @click="roomTypeDialog = true" variant="text" icon size="x-small">
                        <v-icon>mdi-information-outline</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </td>
                <td class="bg-lightgray" v-if="showRoomsInProtelAvailabilitiesSelecter">
                  <AvailabilitiesSelecter
                    :all-availabilities="availabilities"
                    :room-type-code="roomTypeCode"
                    :property-code="camp.id.toString()"
                    :arrival-date="props.arrivalDate"
                    :departure-date="props.departureDate"
                    @availabilities-selected="
                      (protelReservationSelectUpdate: IProtelReservationSelectUpdate) =>
                        availabilitiesSelected(protelReservationSelectUpdate)
                    "
                    :-itinerary-reservation="props.itineraryReservation"
                  ></AvailabilitiesSelecter>
                </td>
              </tr>
            </tbody> </v-table
        ></v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <v-dialog v-model="roomTypeDialog" width="600" scrollable>
    <RoomDetailsCard @close="roomTypeDialog = false"> </RoomDetailsCard>
  </v-dialog>
</template>
