<script setup lang="ts">
import router from '@/router'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'

const props = defineProps<{
  itineraryReservation: IItineraryReservation
}>()

const clickOnEdit = () => {
  router.push('/itinerary-reservations/' + props.itineraryReservation.id)
}
</script>

<template>
  <v-card class="mb-3">
    <v-card-title>
      {{ props.itineraryReservation.id }}
    </v-card-title>
    <v-card-text>
      <v-btn @click="clickOnEdit()"> EDIT </v-btn>
    </v-card-text>
  </v-card>
</template>
