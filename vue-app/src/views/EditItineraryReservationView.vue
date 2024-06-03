<script setup lang="ts">
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import { ItineraryReservationService } from '@/services/reservations/ItineraryReservationService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import EditItineraryReservation from '@/components/itinerary-reservations/EditItineraryReservation.vue'
const axios: AxiosStatic | undefined = inject('axios')
const itineraryReservationService = new ItineraryReservationService(axios)
const props = defineProps({
  itineraryReservationId: String
})
const itineraryReservation: Ref<IItineraryReservation | undefined> = ref(undefined)

onMounted(() => {
  if (props.itineraryReservationId) {
    itineraryReservationService.get(parseInt(props.itineraryReservationId)).then((res) => {
      itineraryReservation.value = res
    })
  }
})
</script>

<template>
  <EditItineraryReservation
    v-if="itineraryReservation"
    :itinerary-reservation-input="itineraryReservation"
  ></EditItineraryReservation>
</template>
