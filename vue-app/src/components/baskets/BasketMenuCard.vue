<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import BasketCard from './BasketCard.vue'
import { ref } from 'vue'
import ReservationInBasketMenuCard from './ReservationInBasketMenuCard.vue'
const basketItemsStore = useBasketItemsStore()
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}
const cartDialog = ref(false)
</script>
<template>
  <v-container class="bg-lightgray pa-1 rounded">
    <ReservationInBasketMenuCard
      v-for="reservation in basketItemsStore.reservations"
      :key="reservation.id"
      :reservation="reservation"
    />
    <div class="d-flex justify-end mt-3">
      <v-btn class="me-2 text-none" @click="removeAllReservations()">Empty Cart</v-btn>
      <v-btn class="primary-button text-none" @click="cartDialog = true">View Cart</v-btn>
    </div>
  </v-container>
  <v-dialog v-model="cartDialog" scrollable auto>
    <v-card>
      <BasketCard @close="cartDialog = false"></BasketCard>
    </v-card>
  </v-dialog>
</template>
