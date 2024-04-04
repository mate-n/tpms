<script setup lang="ts">
import type { IReservation } from '@/interfaces/IReservation'
import { computed, inject, onMounted, ref, type Ref } from 'vue'
import { DateHelper } from '@/helpers/DateHelper'
import { ReservationValidator } from '@/validators/ReservationValidator'
import AvailabilityService from '@/services/AvailabilityService'
import type { AxiosStatic } from 'axios'
import type { IAvailabilityPostBody } from '@/interfaces/availability/IAvailabilityPostBody'
import type { IAvailabilityData } from '@/interfaces/availability/IAvailabilityData'
import type { IProperty } from '@/interfaces/IProperty'
import { PropertyService } from '@/services/PropertyService'
import { RoomService } from '@/services/RoomService'
import type { IRoom } from '@/interfaces/IRoom'
const axios: AxiosStatic | undefined = inject('axios')
const availabilityService = new AvailabilityService(axios)
const propertyService = new PropertyService(axios)
const roomService = new RoomService(axios)
const dateHelper = new DateHelper()
const reservationValidator = new ReservationValidator()
const emit = defineEmits(['check', 'change'])
const reservation = defineModel({ required: true, type: Object as () => IReservation })
const props = defineProps({
  previousReservation: { type: Object as () => IReservation, required: false },
  nextReservation: { type: Object as () => IReservation, required: false }
})
const properties: Ref<IProperty[]> = ref([])
const rooms: Ref<IRoom[]> = ref([])
const profileDialog = ref(false)
import ProfileSearch from './profiles/ProfileSearch.vue'

onMounted(() => {
  propertyService.getProperties().then((response: IProperty[]) => {
    properties.value = response
  })
  roomService.getRooms().then((response: IRoom[]) => {
    rooms.value = response
  })
})

const arrivalDateMenu = ref(false)
const arrivalDateMin = computed(() => {
  if (props.previousReservation) {
    return dateHelper.getDateString(props.previousReservation.departureDate)
  }
  return dateHelper.getDateString(new Date())
})
const arrivalDateMax = computed(() => {
  return dateHelper.getDateString(reservation.value.departureDate)
})
const departureDateMenu = ref(false)
const departureDateMin = computed(() => {
  return dateHelper.getDateString(reservation.value.arrivalDate)
})
const departureDateMax = computed(() => {
  if (props.nextReservation) {
    return dateHelper.getDateString(props.nextReservation.arrivalDate)
  }
  return false
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservation.value.arrivalDate,
    reservation.value.departureDate
  )
})

const arrivalDateString = computed(() => {
  return dateHelper.getDateString(reservation.value.arrivalDate)
})

const departureDateString = computed(() => {
  return dateHelper.getDateString(reservation.value.departureDate)
})

const check = () => {
  if (!reservation.value.property) return
  if (!reservation.value.room) return
  const availabilityPostBody: IAvailabilityPostBody = {
    arrivaldate: dateHelper.getYYYYMMDDFromDate(reservation.value.arrivalDate),
    departuredate: dateHelper.getYYYYMMDDFromDate(reservation.value.departureDate),
    roomtype: reservation.value.room.roomtype,
    propertyid: reservation.value.property.id
  }

  availabilityService.getAvailability(availabilityPostBody).then((response: any) => {
    const availabilityData: IAvailabilityData[] = response.data.availability_data
    reservation.value.availablityData = availabilityData
    reservation.value.baseRateCategory = 'Base Rate | Low Season'
    reservationValidator.validate(reservation.value)
    emit('check')
  })
}

const reset = () => {
  reservation.value.reset()
}

const emitChange = () => {
  reservationValidator.validate(reservation.value)
  emit('change')
}

const openProfileDialog = () => {
  profileDialog.value = true
}

const closeProfileDialog = () => {
  profileDialog.value = false
}
</script>

<template>
  <v-container fluid class="bg-white">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <v-select
          label=""
          v-model="reservation.property"
          :items="properties"
          item-title="name"
          @update:model-value="emitChange()"
          :return-object="true"
        ></v-select>
        <v-icon>mdi-city</v-icon>
      </v-col>
      <v-col>
        <v-menu v-model="arrivalDateMenu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="arrivalDateString"
              label="Arrival"
              append-inner-icon="mdi-calendar"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-card>
            <v-date-picker
              :hide-header="true"
              v-model="reservation.arrivalDate"
              :min="arrivalDateMin"
              :max="arrivalDateMax"
              @update:model-value="emitChange()"
            >
            </v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field
          label="Nights"
          :model-value="numberOfNights"
          type="number"
          :error-messages="reservation.errors['nights']"
          :readonly="true"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-menu v-model="departureDateMenu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="departureDateString"
              label="Departure"
              append-inner-icon="mdi-calendar"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-card>
            <v-date-picker
              :hide-header="true"
              v-model="reservation.departureDate"
              :min="departureDateMin"
              :max="departureDateMax"
              @update:model-value="emitChange()"
            ></v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field
          label="Rooms"
          v-model="reservation.rooms"
          :error-messages="reservation.errors['rooms']"
          type="number"
          @change="emitChange()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          label="Room Type"
          v-model="reservation.room"
          :items="rooms"
          item-title="name"
          :error-messages="reservation.errors['roomType']"
          @update:model-value="emitChange()"
          :return-object="true"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field
          label="Guests per room"
          v-model="reservation.guestsPerRoom"
          :error-messages="reservation.errors['guestsPerRoom']"
          type="number"
          @change="emitChange()"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex">
        <v-autocomplete
          label="Guest"
          placeholder="Last Name | First Name"
          hint="Last Name | First Name"
          v-model="reservation.guest"
          :items="['Daniel, Oechslin', 'Sandro Raess', 'John Doe', 'Max Mustermann']"
          :disabled="previousReservation !== undefined"
          @update:model-value="emitChange()"
        ></v-autocomplete>
        <div class="d-flex align-center" @click="openProfileDialog()">
          <v-icon>mdi-magnify</v-icon>
        </div>
      </v-col>
      <v-col class="d-flex justify-space-between">
        <v-btn class="secondary-button mr-3" @click="reset()">Reset</v-btn>
        <v-btn class="primary-button" @click="check()">Check</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <template v-if="reservation.issues.length > 0">
    <v-container fluid>
      <div class="my-3">
        <div v-for="issue in reservation.issues" :key="issue">
          <v-alert type="warning" elevation="2">{{ issue }}</v-alert>
        </div>
      </div>
    </v-container>
  </template>

  <v-container fluid>
    <v-table>
      <thead>
        <tr class="bg-lightblue">
          <th class="" style="width: 15rem"></th>
          <th
            v-for="availabilityDatum of reservation.availablityData"
            :key="availabilityDatum.room_type_code"
            class="text-center"
          >
            {{ availabilityDatum.room_type_code }}
          </th>
          <template v-if="reservation.availablityData.length === 0">
            <th v-for="i in 12" :key="i"></th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="d-flex justify-space-between align-center">
            <v-icon class="text-primary">mdi-plus</v-icon>
            Availibility (incl. OB)
          </td>
          <td
            v-for="availablityDatum of reservation.availablityData"
            :key="availablityDatum.room_type_code"
            class="bg-lightgray"
          >
            <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
              {{ availablityDatum.availability_count }}
            </div>
          </td>
          <template v-if="reservation.availablityData.length === 0">
            <td v-for="i in 12" :key="i" class="bg-lightgray">
              <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
                <v-icon>mdi-circle-small</v-icon>
              </div>
            </td>
          </template>
        </tr>
        <tr>
          <td class="d-flex justify-end align-center">
            {{ reservation.baseRateCategory }}
          </td>
          <td
            v-for="availabilityDatum of reservation.availablityData"
            :key="availabilityDatum.room_type_code"
            class="bg-lightgray"
          >
            <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
              <template v-if="availabilityDatum.rates_data[0]">
                {{ availabilityDatum.rates_data[0].room_rate }}
              </template>
            </div>
          </td>
          <template v-if="reservation.availablityData.length === 0">
            <td v-for="i in 12" :key="i" class="bg-lightgray">
              <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
                <v-icon>mdi-circle-small</v-icon>
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <v-dialog v-model="profileDialog" fullscreen>
    <v-card>
      <ProfileSearch @close="closeProfileDialog()"></ProfileSearch>
    </v-card>
  </v-dialog>
</template>
