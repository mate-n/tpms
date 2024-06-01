<script setup lang="ts">
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'

const props = defineProps<{
  itineraryReservation: IItineraryReservation
}>()
</script>

<template>
  <v-card class="mb-3">
    <v-card-title>
      {{ props.itineraryReservation.id }}
    </v-card-title>
    <v-card-text>
      <v-btn> EDIT </v-btn>
    </v-card-text>
  </v-card>
</template>
