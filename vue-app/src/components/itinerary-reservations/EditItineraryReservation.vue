<script setup lang="ts">
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import ItineraryReservationForm from './ItineraryReservationForm.vue'

defineEmits(['close', 'update'])
defineProps({
  itineraryReservationInput: {
    type: Object as () => IItineraryReservation,
    required: true
  }
})
</script>
<template>
  <ItineraryReservationForm
    :itineraryReservationInput="itineraryReservationInput"
  ></ItineraryReservationForm>
</template>
