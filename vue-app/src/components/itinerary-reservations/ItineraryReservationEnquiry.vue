<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import type { Ref } from 'vue'
import { DateHelper } from '@/helpers/DateHelper'
import { ItineraryReservationValidator } from '@/validators/ItineraryReservationValidator'
import { useBasketItemsStore } from '@/stores/basketItems'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'
import ReservationFormInEnquiry from './ReservationFormInEnquiry.vue'
const basketItemsStore = useBasketItemsStore()
const dateHelper = new DateHelper()
const itineraryReservationValidator = new ItineraryReservationValidator()
const reservations: Ref<IReservation[]> = ref([])

const updateOrderIndexes = () => {
  reservations.value.forEach((reservation, index) => {
    reservation.orderIndex = index
  })
}

const addReservation = () => {
  const lastReservation = reservations.value[reservations.value.length - 1]
  const newReservation = new Reservation()
  reservations.value.push(newReservation)
  if (lastReservation) {
    newReservation.arrivalDate = lastReservation.departureDate
    newReservation.profileID = selectedProfile.value
  }
  const newDepartureDate = dateHelper.addDays(newReservation.arrivalDate, 2)
  newReservation.departureDate = newDepartureDate
  showBookButton.value = false
}

const onReservationChanged = () => {
  updateAllReservations()
  checkForIssues()
  updateShowBookButton()
}

const removeReservation = (reservation: IReservation) => {
  const index = reservations.value.indexOf(reservation)
  reservations.value.splice(index, 1)
  updateAllReservations()
  checkForIssues()
}

const selectedProfile = computed(() => {
  if (reservations.value.length === 0) return 0
  return reservations.value[0].profileID
})

const updateAllReservations = () => {
  for (const reservation of reservations.value) {
    reservation.profileID = selectedProfile.value
  }
}

const checkForIssues = () => {
  itineraryReservationValidator.validate(reservations.value)
}

const updateShowBookButton = () => {
  const errors = itineraryReservationValidator.getErrors(reservations.value)
  if (errors.length > 0) {
    showBookButton.value = false
  } else {
    showBookButton.value = true
  }
}

const clickOnAdd = () => {
  updateOrderIndexes()
  for (const reservation of reservations.value) {
    basketItemsStore.addReservation(reservation)
  }
}

onBeforeMount(() => {
  addReservation()
})

const showBookButton = ref(false)
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
        <v-list-item @click="addReservation()">
          <v-list-item-title class="d-flex justify-space-between">
            New <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled class="bg-lightgray">
          <v-list-item-title class="d-flex justify-space-between">
            Existing <v-icon>mdi-playlist-plus</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <template v-for="(reservation, i) of reservations" :key="reservation.id">
    <ReservationFormInEnquiry
      v-model="reservations[i]"
      @check="checkForIssues()"
      @change="onReservationChanged()"
      @remove="(reservation) => removeReservation(reservation)"
      :previous-reservation="reservations[i - 1]"
      :next-reservation="reservations[i + 1]"
    ></ReservationFormInEnquiry>
  </template>

  <v-container fluid>
    <div class="d-flex justify-end mt-3">
      <v-btn class="secondary-button">Cancel</v-btn>
      <v-btn class="ml-2 primary-button" v-if="showBookButton" @click="clickOnAdd()">Amend</v-btn>
    </div>
  </v-container>
</template>
