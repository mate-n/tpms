<script setup lang="ts">
import { ref } from 'vue'
import ProfileService from '@/services/ProfileService'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import type { IReservation } from '@/interfaces/IReservation'
import { Reservation as ReservationClass } from '@/classes/Reservation'
import Reservation from '@/components/Reservation.vue'

const axios: AxiosStatic | undefined = inject('axios')
const addReservationItems = [
  { title: 'New', icon: 'mdi-playlist-check' },
  { title: 'Existing', icon: 'mdi-playlist-plus' }
]

const profileService = new ProfileService(axios)
profileService.getProfile().then((profile) => {
  console.log(profile)
})

const reservations: Ref<IReservation[]> = ref([])
const reservation1 = new ReservationClass()
reservation1.camp = 'Twee Rivieren'
reservation1.arrivalDate = new Date()
reservation1.departureDate = new Date()
reservation1.roomType = 'Standard | King'
reservation1.rooms = 1
reservation1.baseRateCategory = 'Base Rate | Low Season'
reservation1.guest = 'John Doe'
reservation1.guestsPerRoom = 2

const reservation2 = new ReservationClass()

reservations.value.push(reservation1)
reservations.value.push(reservation2)
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
        <v-list-item v-for="(item, index) in addReservationItems" :key="index" :value="index">
          <v-list-item-title class="d-flex justify-space-between"
            >{{ item.title }} <v-icon :icon="item.icon"></v-icon
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <template v-for="reservation of reservations">
    <Reservation :reservation="reservation"></Reservation>
  </template>

  <div class="d-flex justify-end">
    <v-btn class="secondary-button">Cancel</v-btn>
    <v-btn class="ml-2 disabled-button">Book</v-btn>
  </div>
</template>
