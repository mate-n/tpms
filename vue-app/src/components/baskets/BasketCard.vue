<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import ReservationInBasketCard from './ReservationInBasketCard.vue'
const basketItemsStore = useBasketItemsStore()

const emits = defineEmits(['close'])
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}
</script>
<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
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
    </v-container>
  </div>
</template>
