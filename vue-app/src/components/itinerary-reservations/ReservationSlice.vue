<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IReservationSelectable } from '@/shared/interfaces/reservations/IReservationSelectable'
import { computed } from 'vue'
const dateFormatter = new DateFormatter()
const props = defineProps({
  reservationSelectable: { type: Object as () => IReservationSelectable, required: true }
})

const emits = defineEmits(['selectReservation'])

const imageUrl = computed(() => {
  return `https://picsum.photos/300/300?sig=${Math.random()}`
})

const datesDivClass = computed(() => {
  return props.reservationSelectable.selected ? 'bg-primary' : ''
})
</script>

<template>
  <v-card class="">
    <v-img height="200px" :src="imageUrl" cover></v-img>
    <v-card-title>
      <v-icon class="me-3">mdi-bed-outline</v-icon
      >{{ reservationSelectable.reservation.propertyName }}
    </v-card-title>
    <v-card-text>
      <div
        :class="datesDivClass"
        class="bg-lightgray pa-3 rounded"
        @click="emits('selectReservation', reservationSelectable)"
      >
        {{ dateFormatter.dddotmmdotyyyy(reservationSelectable.reservation.arrivalDate) }}
        <v-icon>mdi-arrow-right</v-icon>
        {{ dateFormatter.dddotmmdotyyyy(reservationSelectable.reservation.departureDate) }}
      </div>
    </v-card-text>
  </v-card>
</template>
