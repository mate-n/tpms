<script setup lang="ts">
import { ReservationService } from '@/services/ReservationService'
import { Reservation } from '@/shared/classes/Reservation'
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import EditReservation from '@/components/reservations/EditReservation.vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { ItineraryReservationService } from '@/services/reservations/ItineraryReservationService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
const axios: AxiosStatic | undefined = inject('axios')
const itineraryReservationService = new ItineraryReservationService(axios)

const props = defineProps({
  itineraryReservationId: String
})

const itineraryReservation: Ref<IItineraryReservation> = ref(new ItineraryReservation())

onMounted(() => {
  if (props.itineraryReservationId) {
    itineraryReservationService.get(parseInt(props.itineraryReservationId)).then((res) => {
      itineraryReservation.value = res
    })
  }
})
</script>

<template>itineraryReservation</template>
