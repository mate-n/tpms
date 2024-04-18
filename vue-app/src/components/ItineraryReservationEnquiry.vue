<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { IReservation } from '@/interfaces/IReservation'
import { Reservation as ReservationClass } from '@/classes/Reservation'
import ReservationForm from '@/components/ReservationForm.vue'
import { DateHelper } from '@/helpers/DateHelper'
import { ItineraryReservationValidator } from '@/validators/ItineraryReservationValidator'
const dateHelper = new DateHelper()
const itineraryReservationValidator = new ItineraryReservationValidator()
const reservations: Ref<IReservation[]> = ref([])

const addReservation = () => {
  const lastReservation = reservations.value[reservations.value.length - 1]
  const newReservation = new ReservationClass()
  reservations.value.push(newReservation)
  newReservation.orderIndex = getNewOrderIndex()
  if (lastReservation) {
    newReservation.arrivalDate = lastReservation.departureDate
    newReservation.guest = selectedGuest.value
  }
  const newDepartureDate = dateHelper.addDays(newReservation.arrivalDate, 1)
  newReservation.departureDate = newDepartureDate
}

const onReservationChanged = () => {
  updateAllReservations()
  checkForIssues()
}

const removeReservation = (reservation: IReservation) => {
  const index = reservations.value.indexOf(reservation)
  reservations.value.splice(index, 1)
  updateAllReservations()
  checkForIssues()
}

const getNewOrderIndex = () => {
  if (reservations.value.length === 0) return 0
  return reservations.value.length
}

const selectedGuest = computed(() => {
  if (reservations.value.length === 0) return ''
  return reservations.value[0].guest
})

const updateAllReservations = () => {
  for (const reservation of reservations.value) {
    reservation.guest = selectedGuest.value
  }
}

const checkForIssues = () => {
  itineraryReservationValidator.validate(reservations.value)
}
</script>

<template>
  <v-toolbar
    class="bg-primary text-white d-flex justify-space-between"
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
    <ReservationForm
      v-model="reservations[i]"
      @check="checkForIssues()"
      @change="onReservationChanged()"
      @remove="(reservation) => removeReservation(reservation)"
      :previous-reservation="reservations[i - 1]"
      :next-reservation="reservations[i + 1]"
    ></ReservationForm>
  </template>

  <v-container fluid>
    <div class="d-flex justify-end mt-3">
      <v-btn class="secondary-button">Cancel</v-btn>
      <v-btn class="ml-2 disabled-button">Book</v-btn>
    </div>
  </v-container>
</template>
