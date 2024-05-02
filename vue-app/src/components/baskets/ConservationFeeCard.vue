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
      <v-toolbar-title><span class="text-primary">New Conservation Fee</span></v-toolbar-title>
      <div class="profiles-card-toolbar-button">
        <v-icon size="large">mdi-content-save-outline</v-icon>
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-dialog-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <ReservationInBasketCard
        v-for="reservation in basketItemsStore.reservations"
        :key="reservation.id"
        :reservation="reservation"
      />
    </v-container>
  </div>
</template>
