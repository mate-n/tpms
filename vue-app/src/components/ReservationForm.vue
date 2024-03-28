<script setup lang="ts">
import type { IAvailability } from '@/interfaces/IAvailability'
import type { IReservation } from '@/interfaces/IReservation'
import { computed, ref } from 'vue'
import { DateHelper } from '@/helpers/DateHelper'
const dateHelper = new DateHelper()

const reservation = defineModel({ required: true, type: Object as () => IReservation })

const camps = [
  '',
  'Twee Rivieren',
  'Nossob',
  'Kalahari Tent Camp',
  'Grootkolk',
  'Gharagab',
  'Urikaruus',
  'Kielie Krankie',
  'Bitterpan',
  'Unions End',
  'Mata-Mata'
]

const defaultAvailabilities: IAvailability[] = [
  {
    short: 'BD2',
    availableRooms: 29,
    baseRate: 1.934
  },
  {
    short: 'BD2EC',
    availableRooms: 25,
    baseRate: 1.934
  },
  {
    short: 'BD2N',
    availableRooms: 23,
    baseRate: 1.934
  },
  {
    short: 'BD2N2',
    availableRooms: 2,
    baseRate: 1.934
  },
  {
    short: 'BD2V',
    availableRooms: 19,
    baseRate: 2.093
  },
  {
    short: 'BD3B',
    availableRooms: 22,
    baseRate: 1.934
  },
  {
    short: 'BD3E',
    availableRooms: 4,
    baseRate: 1.934
  },
  {
    short: 'BD3ZB',
    availableRooms: 2,
    baseRate: 1.937
  },
  {
    short: 'BG2',
    availableRooms: 25,
    baseRate: 1.554
  },
  {
    short: 'BG2HB',
    availableRooms: 1,
    baseRate: 1.554
  },
  {
    short: 'CK6P',
    availableRooms: 80,
    baseRate: 349
  },
  {
    short: 'CK6',
    availableRooms: 15,
    baseRate: 0
  },
  {
    short: 'GH6',
    availableRooms: 1,
    baseRate: 0
  },
  {
    short: 'GCS',
    availableRooms: 1,
    baseRate: 3.33
  },
  {
    short: 'GC6B',
    availableRooms: 4,
    baseRate: 3.33
  }
]

const arrivalDateMenu = ref(false)
const departureDateMenu = ref(false)

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
  reservation.value.baseRateCategory = 'Base Rate | Low Season'
  reservation.value.availabilities = defaultAvailabilities
}

const reset = () => {
  reservation.value.reset()
}
</script>

<template>
  <v-container fluid class="bg-white">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <v-select label="" v-model="reservation.camp" :items="camps"></v-select>
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
            <v-date-picker :hide-header="true" v-model="reservation.arrivalDate"> </v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field label="Nights" :model-value="numberOfNights" type="number"></v-text-field>
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
            <v-date-picker :hide-header="true" v-model="reservation.departureDate"></v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field label="Rooms" v-model="reservation.rooms" type="number"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          label="Room Type"
          v-model="reservation.roomType"
          :items="['Standard | King', 'Standard | Queen', 'Standard | Twin', 'Standard | Single']"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field
          label="Guests per room"
          v-model="reservation.guestsPerRoom"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          label="Guest"
          placeholder="Last Name | First Name"
          hint="Last Name | First Name"
          v-model="reservation.guest"
          :items="['Daniel, Oechslin', 'Sandro Raess', 'John Doe', 'Max Mustermann']"
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex justify-space-between">
        <v-btn class="secondary-button mr-3" @click="reset()">Reset</v-btn>
        <v-btn class="primary-button" @click="check()">Check</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid>
    <v-table>
      <thead>
        <tr class="bg-lightblue">
          <th class="text-left">
            <v-autocomplete
              density="compact"
              label=""
              prepend-inner-icon="mdi-magnify"
              :items="[]"
            ></v-autocomplete>
          </th>
          <th
            v-for="availability of reservation.availabilities"
            :key="availability.short"
            class="text-center"
          >
            {{ availability.short }}
          </th>
          <template v-if="reservation.availabilities.length === 0">
            <th v-for="i in 12" :key="i"></th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="d-flex justify-space-between align-center" style="width: 15rem">
            <v-icon class="text-primary">mdi-plus</v-icon>
            Availibility (incl. OB)
          </td>
          <td
            v-for="availability of reservation.availabilities"
            :key="availability.short"
            class="bg-lightgray"
          >
            <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
              {{ availability.availableRooms }}
            </div>
          </td>
          <template v-if="reservation.availabilities.length === 0">
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
            v-for="availability of reservation.availabilities"
            :key="availability.short"
            class="bg-lightgray"
          >
            <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
              {{ availability.baseRate }}
            </div>
          </td>
          <template v-if="reservation.availabilities.length === 0">
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
</template>
