<script setup lang="ts">
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { computed, ref, type Ref } from 'vue'
import ProfileGeneralForm from '@/components/profiles/ProfileGeneralForm.vue'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import ReservationSlice from './ReservationSlice.vue'
import type { IReservationSelectable } from '@/shared/interfaces/reservations/IReservationSelectable'
import ReservationCards from '@/components/reservations/ReservationCards.vue'

defineProps({
  itineraryReservationInput: { type: Object as () => IItineraryReservation, required: true }
})
const reservationSelectables: Ref<IReservationSelectable[]> = ref([])
const itineraryReservationToBeEdited = ref<IItineraryReservation>(new ItineraryReservation())
const profileAssociatedWithItineraryReservation = ref<IProfile>(new Profile())

const selectReservation = (reservationSelectable: IReservationSelectable) => {
  reservationSelectables.value.forEach((reservationSelectable) => {
    reservationSelectable.selected = false
  })
  reservationSelectable.selected = true
}

const selectedReservation = computed(() => {
  return reservationSelectables.value.find(
    (reservationSelectable) => reservationSelectable.selected
  )
})
</script>
<template>
  <v-toolbar class="bg-primary">
    <v-toolbar-title
      ><v-icon>mdi-account-circle-outline</v-icon>
      {{ profileAssociatedWithItineraryReservation.name }}
      {{ profileAssociatedWithItineraryReservation.surname }}</v-toolbar-title
    >
  </v-toolbar>
  <ProfileGeneralForm v-model="profileAssociatedWithItineraryReservation"></ProfileGeneralForm>
  <v-toolbar class="bg-lightgray">
    <div class="h-100 d-flex px-5 align-center me-auto font-size-rem-14">
      Itinerary Reservations
      <v-icon class="mx-3" size="x-small">mdi-arrow-right</v-icon> #{{
        itineraryReservationToBeEdited.id
      }}
    </div>
  </v-toolbar>
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 standard-card-column">
        <div class="standard-card">
          <v-divider class="standard-card-divider"></v-divider>
          <v-container fluid>
            <div class="d-flex justify-space-between">
              <template
                v-for="(reservationSelectable, index) of reservationSelectables"
                :key="reservationSelectable.reservation.id"
              >
                <ReservationSlice
                  :reservationSelectable="reservationSelectable"
                  @selectReservation="
                    (reservationSelectable) => selectReservation(reservationSelectable)
                  "
                ></ReservationSlice>
                <div
                  class="d-flex align-center justify-center"
                  v-if="index !== reservationSelectables.length - 1"
                >
                  <v-icon size="x-large">mdi-arrow-right</v-icon>
                </div>
              </template>
            </div>
          </v-container>
        </div></v-col
      >
    </v-row>
  </v-container>
  <v-container fluid class="bg-lightgray pt-0" v-if="selectedReservation">
    <ReservationCards v-model="selectedReservation.reservation"></ReservationCards>
  </v-container>
</template>
