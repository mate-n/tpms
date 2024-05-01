<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import ReservationCardInBasket from './ReservationCardInBasket.vue'
const basketItemsStore = useBasketItemsStore()
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}
</script>
<template>
  <v-container class="bg-lightgray pa-1 rounded">
    <ReservationCardInBasket
      v-for="reservation in basketItemsStore.reservations"
      :key="reservation.id"
      :reservation="reservation"
    />
    <div class="d-flex justify-end mt-3">
      <v-btn class="me-2 text-none" @click="removeAllReservations()">Empty Cart</v-btn>
      <v-btn class="primary-button text-none">View Cart</v-btn>
    </div>
  </v-container>
</template>
