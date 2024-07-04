<script setup lang="ts">
import { ref } from 'vue'

// sandro.raess To-Do: Implement api with axios once api is available.
//import { inject } from 'vue'
//import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import type { IReservation } from '@/interfaces/IReservation'
import { Reservation as ReservationClass } from '@/classes/Reservation'
import ReservationForm from '@/components/ReservationForm.vue'
import { DateHelper } from '@/helpers/DateHelper'
import { TravelDistanceChecker } from '@/helpers/TravelDistanceChecker'
const dateHelper = new DateHelper()
const travelDistanceChecker = new TravelDistanceChecker()
// sandro.raess To-Do: Implement api with axios once api is available.
//const axios: AxiosStatic | undefined = inject('axios')

const reservations: Ref<IReservation[]> = ref([])

const addReservation = () => {
  const lastReservation = reservations.value[reservations.value.length - 1]
  const newReservation = new ReservationClass()
  reservations.value.push(newReservation)
  newReservation.orderIndex = getNewOrderIndex()
  if (lastReservation) {
    newReservation.arrivalDate = lastReservation.departureDate
  }
  const newDepartureDate = dateHelper.addDays(newReservation.arrivalDate, 1)
  newReservation.departureDate = newDepartureDate
}

const getNewOrderIndex = () => {
  if (reservations.value.length === 0) return 0
  return reservations.value.length
}

const checkForIssues: () => void = () => {
  for (let i = 0; i < reservations.value.length; i++) {
    const issues: string[] = []
    if (i > 0) {
      const isSameDay = dateHelper.isSameDay(
        reservations.value[i].arrivalDate,
        reservations.value[i - 1].departureDate
      )
      if (!isSameDay) {
        issues.push('Reservation dates do not match up')
      }

      const isTravelDistancePossibleInOneDay =
        travelDistanceChecker.isDistanceIsPossibleToTravelWithinADay(
          reservations.value[i - 1].camp,
          reservations.value[i].camp
        )

      if (!isTravelDistancePossibleInOneDay) {
        issues.push('Travel distance is too far')
      }
    }
    reservations.value[i].issues = issues
  }
}
</script>

<template>
  <v-toolbar
    class="bg-primary d-flex justify-space-between"
    :title="$t('general.itineraryReservationEnquiry')"
    app
  >
    <v-menu>
      <template v-slot:activator="{ props, isActive }">
        <v-btn class="bg-white" v-bind="props">
          {{ $t('general.addReservation') }}
          <v-icon v-if="isActive" icon="mdi-chevron-up"></v-icon>
          <v-icon v-if="!isActive" icon="mdi-chevron-down"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="d-flex justify-space-between" @click="addReservation()">
            New <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title class="d-flex justify-space-between">
            Existing <v-icon>mdi-playlist-plus</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <template v-for="(reservation, i) of reservations" :key="reservation.id">
    <ReservationForm v-model="reservations[i]" @check="checkForIssues()"></ReservationForm>
  </template>

  <v-container fluid>
    <div class="d-flex justify-end mt-3">
      <v-btn class="secondary-button">Cancel</v-btn>
      <v-btn class="ml-2 disabled-button">Book</v-btn>
    </div>
  </v-container>
</template>
