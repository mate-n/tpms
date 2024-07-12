<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import type { AxiosStatic } from 'axios'

import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import type { IRate } from '@/shared/interfaces/IRate'
import { RateService } from '@/services/RateService'
import { DateHelper } from '@/helpers/DateHelper'

import ItineraryReservationCard from './ItineraryReservationCard.vue'

const axios: AxiosStatic | undefined = inject('axios')
const rateService = new RateService(axios)
const dateHelper = new DateHelper()

const emit = defineEmits(['update'])

const showDrawer = ref(true)
const availableRates = ref<IRate[]>([])
const minDate = ref<Date | undefined>()
const campReservations = ref<{ name: string; reservations: IProtelReservation[] }[]>([])

const props = defineProps({
  itineraryReservation: { type: Object as () => ItineraryReservation, required: true }
})

const handleUpdate = (data: IProtelReservation) => {
  const newProtelReservations = props.itineraryReservation.protelReservations.map((item) =>
    item.id === data.id ? { ...data } : { ...item }
  )
  emit('update', newProtelReservations)
}

const handleDelete = (data: IProtelReservation) => {
  const newProtelReservations = props.itineraryReservation.protelReservations.filter(
    (item) => item.id !== data.id
  )
  emit('update', newProtelReservations)
}

watch(
  () => props.itineraryReservation,
  () => {
    // group "reservations" by "camp"
    const groupSet: Record<string, IProtelReservation[]> = {}
    props.itineraryReservation.protelReservations.forEach((reservation) => {
      const name = reservation.property_name.trim()
      if (!groupSet[name]) groupSet[name] = []
      groupSet[name].push({ ...reservation })
    })

    const campReservationList: { name: string; reservations: IProtelReservation[] }[] = []
    // loop in "selectedCamps" to keep the correct order
    props.itineraryReservation.selectedCamps.forEach((camp) => {
      const name = camp.name.trim()
      if (groupSet[name]) {
        campReservationList.push({ name: name, reservations: groupSet[name] })
      }
    })
    campReservations.value = campReservationList
  },
  { immediate: true, deep: true }
)

watch(
  () => props.itineraryReservation.arrivalDate,
  () => (minDate.value = dateHelper.addDays(props.itineraryReservation.arrivalDate, -1)),
  { immediate: true, deep: true }
)

onMounted(() => {
  rateService.getAvailableRates().then((response) => {
    availableRates.value = response
  })
})
</script>

<template>
  <v-btn variant="text" icon="mdi-menu" @click="showDrawer = !showDrawer"></v-btn>

  <v-navigation-drawer v-model="showDrawer" :width="400" location="right">
    <h2 class="pa-2">
      <strong>Placed reservations list</strong>
    </h2>

    <div v-for="{ name, reservations } in campReservations" :key="name">
      <h3 class="my-2 py-2 px-5 bg-lightgray">
        <strong>{{ name }}</strong>
      </h3>

      <div
        class="flex flex-col px-2 py-2"
        v-for="protelReservation in reservations"
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
    </div>
  </v-navigation-drawer>
</template>
