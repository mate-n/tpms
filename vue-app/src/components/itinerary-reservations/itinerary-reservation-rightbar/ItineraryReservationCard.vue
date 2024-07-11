<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IGuestsPerRoom } from '@/shared/interfaces/IGuestsPerRoom'

import DateSelecter from '@/components/dates/DateSelecter.vue'
import GuestsPerRoomSelecter from '@/components/selecters/GuestsPerRoomSelecter.vue'
import { DateHelper } from '@/helpers/DateHelper'
const dateHelper = new DateHelper()

const emit = defineEmits(['update'])

const props = defineProps({
  reservation: { type: Object as () => IProtelReservation, required: true }
})

const arrivalDate: Ref<Date | null> = ref(null)
const departureDate: Ref<Date | null> = ref(null)
const arrivalDateNextDay: Ref<Date | null> = ref(null)
const guestsPerRoom: Ref<IGuestsPerRoom | null> = ref(null)

const handleUpdate = (data: Partial<IProtelReservation>) => {
  emit('update', data)
}

watch(
  () => props.reservation.arrivalDate,
  (val) => {
    arrivalDate.value = val
    arrivalDateNextDay.value = dateHelper.addDays(props.reservation.arrivalDate, 1)
  },
  { immediate: true, deep: true }
)
watch(
  () => props.reservation.departureDate,
  (val) => (departureDate.value = val),
  { immediate: true, deep: true }
)
watch(
  () => props.reservation.guestsPerRoom,
  (val) => (guestsPerRoom.value = val),
  { immediate: true, deep: true }
)
</script>

<template>
  <v-card class="px-2">
    <div class="border-b-sm py-2">{{ reservation.roomTypeCode }}</div>
    <v-row class="py-2">
      <v-col cols="6">
        <DateSelecter
          label="Arrival"
          v-model="arrivalDate"
          @update:model-value="(val) => handleUpdate({ arrivalDate: val })"
        ></DateSelecter>
        <DateSelecter
          label="Departure"
          v-model="departureDate"
          :min="arrivalDateNextDay"
          @update:model-value="(val) => handleUpdate({ departureDate: val })"
        ></DateSelecter>
      </v-col>

      <v-col cols="6">
        <GuestsPerRoomSelecter
          v-model="guestsPerRoom"
          :errors="reservation.errors"
          @update:model-value="(val) => handleUpdate({ guestsPerRoom: val })"
        ></GuestsPerRoomSelecter
      ></v-col>
    </v-row>
  </v-card>
</template>
