<script setup lang="ts">
import { ReservationService } from '@/services/ReservationService'
import { Reservation } from '@/shared/classes/Reservation'
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EditReservation from '@/components/reservations/EditReservation.vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
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
</script>

<template>
  <EditReservation :reservation-input="reservation"></EditReservation>
</template>
