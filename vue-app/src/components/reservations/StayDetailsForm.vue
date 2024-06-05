<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'
import DateSelecter from '../dates/DateSelecter.vue'
import { DateHelper } from '@/helpers/DateHelper'
import { computed } from 'vue'
import TimeSelecter from '../times/TimeSelecter.vue'

const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })

const dateHelper = new DateHelper()

const arrivalDateMin = computed(() => {
  return dateHelper.getDateString(new Date())
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservationToBeEdited.value.arrivalDate,
    reservationToBeEdited.value.departureDate
  )
})

const departureDateMin = computed(() => {
  return dateHelper.getDateString(reservationToBeEdited.value.arrivalDate)
})
</script>
<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Stay Details</span></v-toolbar-title>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <v-row>
        <v-col>
          <DateSelecter v-model="reservationToBeEdited.arrivalDate" label="Arrival"></DateSelecter>
        </v-col>
        <v-col>
          <DateSelecter v-model="reservationToBeEdited.arrivalDate" label="Optional"></DateSelecter>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            label="Nights"
            v-model="numberOfNights"
            :error-messages="
              reservationToBeEdited.errors && reservationToBeEdited.errors['numberOfNights']
            "
            variant="underlined"
            type="number"
          ></v-text-field
        ></v-col>
        <v-col>
          <v-text-field
            label="Guests per room"
            v-model="reservationToBeEdited.numberOfGuestsPerRoom"
            :error-messages="
              reservationToBeEdited.errors && reservationToBeEdited.errors['numberOfGuestsPerRoom']
            "
            variant="underlined"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <DateSelecter
            v-model="reservationToBeEdited.departureDate"
            label="Departure"
          ></DateSelecter>
        </v-col>
        <v-col>
          <v-text-field label="GTD / CXL" variant="underlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex">
            <div class="me-2">
              <TimeSelecter label="ETA"></TimeSelecter>
            </div>
            <div>
              <TimeSelecter label="ETD"></TimeSelecter>
            </div>
          </div>
        </v-col>
        <v-col>
          <v-select
            label="Payment Type"
            variant="underlined"
            :items="['Credit Card', 'Cash', 'Noncash', 'Debitor']"
            class="me-3 required-input"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
