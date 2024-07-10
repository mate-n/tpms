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
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
import RoomDetailsCard from '@/components/rooms/RoomDetailsCard.vue'
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
  roomTypeCode: { type: String, required: false },
})

const expansionModel = ref<string[] | null>(['availabilities'])
const selectedAvailabilities: Ref<IProtelAvailability[]> = ref([])
const availabilities: Ref<IProtelAvailability[]> = ref([])

const nightsOverviewString = computed(() => {
  const selectedNights = selectedAvailabilities.value.length

  return `${selectedNights} / ${numberOfNights.value}`
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(props.arrivalDate, props.departureDate)
})

const availableDates = computed(() => {
  const dates = []
  for (let i = 0; i < numberOfNights.value + 1; i++) {
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
  for (const availability of selectedAvailabilities.value) {
    if (dateHelper.isSameDay(date, availability.availability_start)) {
      return true
    }
  }
  return false
}

const isDateOccupiedByOtherReservations = (date: Date) => {
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
  const departureDatePlusOne = dateHelper.addDays(props.departureDate, 1)

  const protelAvailabilityPostBody: IProtelAvailabilityPostBody = {
    arrivaldate: dateFormatter.yyyydashmmdashdd(props.arrivalDate),
    departuredate: dateFormatter.yyyydashmmdashdd(departureDatePlusOne),
    roomtype: props.roomTypeCode || 'null',
    propertyid: props.camp.id.toString(),
    detail: '0',
    accomodation_type: null
  }

  availabilityService.getAvailabilities(protelAvailabilityPostBody).then((response) => {
    availabilities.value = response
  })
}

watch(
  [() => props.arrivalDate, () => props.departureDate, () => props.roomTypeCode],
  async () => {
    getAvailabilities()
  },
  {
    immediate: true,
    deep: true
  }
)

const availabilitiesSelected = (availabilities: IProtelAvailability[]) => {
  selectedAvailabilities.value = availabilities
  emits('availabilities-selected', availabilities)
}
</script>
<template>
  <v-container fluid class="bg-white">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <h3>
          <strong>{{ camp.name }}</strong>
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
        <v-btn>Reset</v-btn>
      </v-col>
      <v-col>
        <v-btn>Total: 0.00</v-btn>
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
                  <v-btn variant="text" icon @click="clickOnPlusButtonInAvailability()">
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
                    <div>{{ roomTypeCode }}</div>
                    <div>
                      <v-btn @click="roomTypeDialog = true" variant="text" icon size="x-small">
                        <v-icon>mdi-information-outline</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </td>
                <td class="bg-lightgray" v-if="showRoomsInProtelAvailabilitiesSelecter">
                  <AvailabilitiesSelecter
                    :availabilities="
                      availabilityHelper.getAvailabilityByRoomTypeCode(availabilities, roomTypeCode)
                    "
                    :room-type-code="roomTypeCode"
                    :arrival-date="props.arrivalDate"
                    :departure-date="props.departureDate"
                    @availabilities-selected="
                      (availabilities: IProtelAvailability[]) =>
                        availabilitiesSelected(availabilities)
                    "
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
