<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import ReservationInBasketCard from './ReservationInBasketCard.vue'
import { computed } from 'vue'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import router from '@/router'
const basketItemsStore = useBasketItemsStore()
const reservationHelper = new ReservationHelper()
const emits = defineEmits(['close'])
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}

const totalPrice = computed(() => {
  return reservationHelper.getTotalPrice(basketItemsStore.reservations)
})

const clickOnBook = () => {
  router.push('/itinerary-reservations/1')

  emits('close')
}
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
      <v-toolbar-title><span class="text-primary">Basket</span></v-toolbar-title>
      <div class="profiles-card-toolbar-button">Confirm Cart</div>
      <div class="profiles-card-toolbar-button" @click="removeAllReservations()">
        <v-icon size="large">mdi-timer-sand-empty</v-icon> Empty Cart
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <div v-for="(reservation, index) in basketItemsStore.reservations" :key="reservation.id">
        <ReservationInBasketCard v-model="basketItemsStore.reservations[index]" />
      </div>
      <div class="d-flex justify-end align-center">
        <v-card class="me-2">
          <v-card-text>
            <p>
              <strong>Total: {{ totalPrice.toFixed(2) }}</strong>
            </p>
          </v-card-text>
        </v-card>
        <div></div>

        <v-btn
          v-if="basketItemsStore.reservations.length > 0"
          style="background-color: green; color: white"
          elevation="4"
          @click="clickOnBook()"
          >BOOK</v-btn
        >
      </div>
    </v-container>
  </div>
</template>
