<script setup lang="ts">
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import ItineraryReservationCard from './ItineraryReservationCard.vue'

const emit = defineEmits(['update'])

const props = defineProps({
  itineraryReservation: { type: Object as () => ItineraryReservation, required: true }
})

const handleUpdate = (reservation: IProtelReservation, data: Partial<IProtelReservation>) => {
  const newProtelReservations = props.itineraryReservation.protelReservations.map((item) => {
    if (item.roomTypeCode !== reservation.roomTypeCode) return { ...item }
    return { ...item, ...data }
  })
  emit('update', newProtelReservations)
}
</script>

<template>
  <v-navigation-drawer :value="true" :width="400" location="right">
    <div
      class="flex flex-col gap-2 px-2 py-2"
      v-for="reservation in itineraryReservation.protelReservations"
      :key="reservation.roomTypeCode"
    >
      <ItineraryReservationCard
        :reservation="reservation"
        @update="(val) => handleUpdate(reservation, val)"
      />
    </div>
  </v-navigation-drawer>
</template>
