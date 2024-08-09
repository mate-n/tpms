<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { DateHelper } from '@/helpers/DateHelper'
import DateSelecter from '@/components/dates/DateSelecter.vue'
import GuestsPerRoomSelecter from '@/components/selecters/GuestsPerRoomSelecter.vue'
import type { IRate } from '@/shared/interfaces/IRate'
import { ProtelReservation } from '@/shared/classes/ProtelReservation'
import { PriceFormatter } from '@/helpers/PriceFormatter'
const priceFormatter = new PriceFormatter()
const dateHelper = new DateHelper()

const emit = defineEmits(['update', 'delete'])

const props = defineProps({
  minDate: { type: Date, required: false },
  maxDate: { type: Date, required: false },
  availableRates: { type: Object as () => IRate[], required: true },
  protelReservation: { type: Object as () => IProtelReservation, required: true }
})

const reservation = ref<IProtelReservation>(new ProtelReservation())
const maxArrivalDate = ref<Date | undefined>()
const minDepartureDate = ref<Date | undefined>()

const handleUpdate = () => {
  emit('update', { ...reservation.value })
}

watch(
  () => props.protelReservation.departureDate,
  () => (maxArrivalDate.value = dateHelper.addDays(props.protelReservation.departureDate, -1)),
  { immediate: true, deep: true }
)

watch(
  () => props.protelReservation.arrivalDate,
  () => (minDepartureDate.value = dateHelper.addDays(props.protelReservation.arrivalDate, 1)),
  { immediate: true, deep: true }
)

watch(
  () => props.protelReservation,
  () => (reservation.value = props.protelReservation),
  { immediate: true, deep: true }
)

const formattedRate = computed(() => {
  return priceFormatter.formatPriceString(props.protelReservation.rate.value)
})
</script>

<template>
  <v-card class="px-3">
    <div class="d-flex justify-space-between align-center py-3">
      <div class="d-flex ga-2">
        <v-icon>mdi-bed-outline</v-icon>
        <p>{{ reservation.roomTypeCode }}</p>
      </div>
      <v-btn
        class="text-grey-darken-1"
        density="compact"
        variant="text"
        icon="mdi-delete-outline"
        @click="emit('delete', protelReservation)"
      ></v-btn>
    </div>

    <v-divider class="mb-3"></v-divider>

    <v-row>
      <v-col cols="5">
        <DateSelecter
          readonly
          label="Arrival"
          :min="minDate"
          :max="maxArrivalDate"
          v-model="reservation.arrivalDate"
          @update:model-value="handleUpdate"
        ></DateSelecter>
        <DateSelecter
          readonly
          label="Departure"
          :min="minDepartureDate"
          :max="maxDate"
          v-model="reservation.departureDate"
          @update:model-value="handleUpdate"
        ></DateSelecter>
      </v-col>

      <v-col cols="7">
        <v-row>
          <v-col cols="6">
            <GuestsPerRoomSelecter
              readonly
              v-model="reservation.guestsPerRoom"
              @update:model-value="handleUpdate"
            ></GuestsPerRoomSelecter>
          </v-col>

          <v-col cols="6">
            <v-number-input
              :hide-spin-buttons="true"
              controlVariant="default"
              variant="underlined"
              label="Rooms"
              :min="1"
              v-model="reservation.numberOfRooms"
              @update:model-value="handleUpdate"
            ></v-number-input>
          </v-col>
        </v-row>

        <v-select
          return-object
          readonly
          label="Average Price"
          variant="underlined"
          item-title="value"
          v-model="formattedRate"
          @update:model-value="handleUpdate"
        ></v-select>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss">
.hide-control {
  .v-field__append-inner {
    background: red;
    display: none !important;
  }
}
</style>
