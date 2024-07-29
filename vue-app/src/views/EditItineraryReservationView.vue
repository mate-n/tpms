<script setup lang="ts">
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import EditItineraryReservationCard from '@/components/reservations/EditItineraryReservationCard.vue'
const axios2: AxiosStatic | undefined = inject('axios2')
const cartService = new CartService(axios2)
const campService = new CampService(axios2)
const cartConverter = new CartConverter(campService)
const props = defineProps({
  itineraryReservationId: String
})
const itineraryReservation: Ref<IItineraryReservation | undefined> = ref(undefined)
import router from '@/router'
import { CartService } from '@/services/backend-middleware/CartService'
import { CartConverter } from '@/shared/converters/CartConverter'
import { CampService } from '@/services/backend-middleware/CampService'

onMounted(() => {
  if (props.itineraryReservationId) {
    cartService.retrieveCart(props.itineraryReservationId).then((res) => {
      if (res) {
        cartConverter.convertToItineraryReservation(res).then((newItineraryReservation) => {
          itineraryReservation.value = newItineraryReservation
        })
      }
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
