<script setup lang="ts">
import { ReservationService } from '@/services/ReservationService'
import { Reservation } from '@/shared/classes/Reservation'
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
import EditReservationCard from '@/components/reservations/EditReservationCard.vue'
import router from '@/router'

const axios: AxiosStatic | undefined = inject('axios')
const reservationService = new ReservationService(axios)

const props = defineProps({
  reservationId: String
})

const reservation: Ref<IReservation> = ref(new Reservation())

onMounted(() => {
  if (props.reservationId) {
    reservationService.get(parseInt(props.reservationId)).then((res) => {
      reservation.value = res
    })
  }
})

const goToReservation = () => {
  router.push('/reservations')
}
</script>

<template>
  <EditReservationCard
    :reservation-input="reservation"
    @close="goToReservation()"
  ></EditReservationCard>
</template>
