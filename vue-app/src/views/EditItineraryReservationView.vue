<script setup lang="ts">
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import { ItineraryReservationService } from '@/services/reservations/ItineraryReservationService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import EditItineraryReservationCard from '@/components/reservations/EditItineraryReservationCard.vue'
const axios: AxiosStatic | undefined = inject('axios')
const itineraryReservationService = new ItineraryReservationService(axios)
const props = defineProps({
  itineraryReservationId: String
})
const itineraryReservation: Ref<IItineraryReservation | undefined> = ref(undefined)
import router from '@/router'

onMounted(() => {
  if (props.itineraryReservationId) {
    itineraryReservationService.get(parseInt(props.itineraryReservationId)).then((res) => {
      itineraryReservation.value = res
    })
  }
})

const goToItineraryReservations = () => {
  router.push('/itinerary-reservations')
}
</script>

<template>
  <EditItineraryReservationCard
    v-if="itineraryReservation"
    @close="goToItineraryReservations"
    :itinerary-reservation-input="itineraryReservation"
  ></EditItineraryReservationCard>
</template>
