<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'
import EditReservation from './EditReservation.vue'
defineProps({
  reservationInput: { type: Object as () => IReservation, required: true }
})
const emits = defineEmits(['close'])
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Edit Reservation</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <EditReservation :reservation-input="reservationInput"></EditReservation>
  </div>
</template>
