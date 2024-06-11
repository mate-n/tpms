<script setup lang="ts">
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import EditItineraryReservation from '../itinerary-reservations/EditItineraryReservation.vue'
defineProps({
  itineraryReservationInput: {
    type: Object as () => IItineraryReservation,
    required: true
  }
})
const emits = defineEmits(['close'])
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title
        ><span class="text-primary">Edit Itinerary Reservation</span></v-toolbar-title
      >
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <EditItineraryReservation
      :itinerary-reservation-input="itineraryReservationInput"
    ></EditItineraryReservation>
  </div>
</template>
