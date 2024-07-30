<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import type { AxiosStatic } from 'axios'
import { ItineraryReservationService } from '@/services/reservations/ItineraryReservationService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { CartService } from '@/services/backend-middleware/CartService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'
import ReservationsTable from '@/components/reservations/ReservationsTable.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import { CampService } from '@/services/backend-middleware/CampService'
const axios: AxiosStatic | undefined = inject('axios')
const axios2: AxiosStatic | undefined = inject('axios2')
const cartService = new CartService(axios2)
const profileService = new ProfileService(axios2)
const campService = new CampService(axios2)

const itineraryReservationService = new ItineraryReservationService(axios)
const itineraryReservations: Ref<IItineraryReservation[]> = ref([])
onMounted(() => {
  itineraryReservationService.getAll().then((data) => {
    itineraryReservations.value = data
  })
})
const profileNumberOfCart = ref<string>('0')
const searchField = ref<string>('')
const clickOnSearch = async () => {
  reservations.value = []

  const campsFromAPI = await campService.findAllFilteredByProtelUserEmail(undefined)
  const dataFromAPI = await cartService.retrieveCart(searchField.value)
  if (!dataFromAPI) {
    return
  }
  const profileNumberString = dataFromAPI['cart']['profile_number']
    ? dataFromAPI['cart']['profile_number']
    : '1'
  const profileFromAPI = await profileService.get(parseInt(profileNumberString))

  for (const item of dataFromAPI.cart_items) {
    const campId = item.camp_id
    const camp = campsFromAPI.find((camp) => camp.id == campId)
    const campName = camp?.name

    const newReservation = new Reservation()
    newReservation.profileID = parseInt(profileNumberOfCart.value)
    newReservation.guestName = profileFromAPI?.name + ' ' + profileFromAPI?.surname
    newReservation.arrivalDate = new Date(item.arrival_date)
    newReservation.departureDate = new Date(item.departure_date)
    newReservation.roomID = parseInt(item.unit_id)
    newReservation.propertyID = campId
    if (campName) {
      newReservation.propertyName = campName
    }
    reservations.value.push(newReservation)
  }
}

const reservations: Ref<IReservation[]> = ref([])
</script>

<template>
  <v-toolbar
    class="bg-primary text-white d-flex justify-space-between"
    :title="$t('itineraryReservation.plural')"
    app
  >
  </v-toolbar>
  <v-container fluid class="bg-lightgray">
    <v-row class="d-flex align-center">
      <v-col>
        <v-text-field
          v-model="searchField"
          label="Search"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-text-field>
      </v-col>

      <v-col class="d-flex justify-space-between">
        <v-btn class="primary-button mr-3 w-100" @click="clickOnSearch()">SEARCH</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="bg-white">
    <ReservationsTable :reservations="reservations"></ReservationsTable>
  </v-container>
</template>
