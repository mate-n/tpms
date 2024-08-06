<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import type { AxiosStatic } from 'axios'

import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IRate } from '@/shared/interfaces/IRate'
import { RateService } from '@/services/RateService'
import { DateHelper } from '@/helpers/DateHelper'

import ItineraryReservationCard from './ItineraryReservationCard.vue'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'

const axios2: AxiosStatic | undefined = inject('axios2')
const rateService = new RateService(axios2)
const dateHelper = new DateHelper()

const emit = defineEmits(['update', 'toggle'])

const showDrawer = ref(true)
const availableRates = ref<IRate[]>([])
const minDate = ref<Date | undefined>()

const props = defineProps({
  showRightBar: { type: Boolean, required: true },
  itineraryReservation: { type: Object as () => IItineraryReservation, required: true }
})

const handleUpdate = (data: IProtelReservation) => {
  const newProtelReservations = props.itineraryReservation.protelReservations.map((item) =>
    item.localID === data.localID ? { ...data } : { ...item }
  )
  emit('update', newProtelReservations)
}

const handleDelete = (data: IProtelReservation) => {
  const newProtelReservations = props.itineraryReservation.protelReservations.filter(
    (item) => item.localID !== data.localID
  )
  emit('update', newProtelReservations)
}

watch(
  () => props.itineraryReservation.arrivalDate,
  () => (minDate.value = dateHelper.addDays(props.itineraryReservation.arrivalDate, -1)),
  { immediate: true, deep: true }
)

watch(
  () => props.showRightBar,
  () => (showDrawer.value = props.showRightBar),
  { immediate: true, deep: true }
)

onMounted(() => {
  rateService.getAvailableRates().then((response) => {
    availableRates.value = response
  })
})
</script>

<template>
  <v-btn variant="text" icon="mdi-menu" @click="emit('toggle', !props.showRightBar)"></v-btn>

  <v-navigation-drawer v-model="showDrawer" :width="450" location="right">
    <h2 v-if="props.itineraryReservation.protelReservations.length" class="pa-2">
      <strong>Placed reservations list</strong>
    </h2>
    <div
      class="flex flex-col px-2 py-2"
      v-for="protelReservation in props.itineraryReservation.protelReservations"
      :key="protelReservation.roomTypeCode"
    >
      <ItineraryReservationCard
        :min-date="minDate"
        :max-date="props.itineraryReservation.departureDate"
        :available-rates="availableRates"
        :protel-reservation="protelReservation"
        @update="handleUpdate"
        @delete="handleDelete"
      />
    </div>
  </v-navigation-drawer>
</template>
