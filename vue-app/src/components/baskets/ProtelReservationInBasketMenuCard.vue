<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IRoom } from '@/shared/interfaces/IRoom'
import { computed, ref, type Ref } from 'vue'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { DateHelper } from '@/helpers/DateHelper'
const priceFormatter = new PriceFormatter()
const dateHelper = new DateHelper()
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const props = defineProps({
  reservation: { type: Object as () => IProtelReservation, required: true }
})
const emits = defineEmits(['removeReservation'])
const room: Ref<IRoom | null> = ref(null)
const dateFormatter = new DateFormatter()

const removeReservation = (reservation: IProtelReservation) => {
  //basketItemsStore.removeReservation(reservation)
  console.log(reservation)
  emits('removeReservation')
}

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    props.reservation.arrivalDate,
    props.reservation.departureDate
  )
})
</script>

<template>
  <v-card min-width="350" class="mb-2">
    <v-card-text class="pt-0 px-2">
      <div class="d-flex justify-end">
        <v-btn variant="text" size="x-small" @click="removeReservation(reservation)" icon
          ><v-icon size="medium">mdi-close</v-icon></v-btn
        >
      </div>
      <div class="mb-1">
        <v-icon>mdi-chevron-double-right</v-icon><strong>{{ reservation.property_name }}</strong>
      </div>
      <v-row class="pb-0">
        <v-col class="text-gray">{{ room?.code }}</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-right </v-icon
          >{{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }}</v-col
        >
      </v-row>
      <v-row class="mt-0 pb-0">
        <v-col class="text-gray">Base Rate | Low Season</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-left </v-icon
          >{{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}</v-col
        >
      </v-row>
      <v-divider class="mt-1"></v-divider>
      <v-row class="mt-0 pb-0">
        <v-col></v-col>
        <v-col class="">
          <div class="mb-1 text-end">
            {{ numberOfNights }} x
            {{ priceFormatter.formatPrice(parseInt(reservation.rate.value)) }}
          </div>
          <v-divider></v-divider>
          <div class="text-end mt-1">
            Total:
            <strong>{{
              priceFormatter.formatPrice(
                protelReservationPriceCalculator.getPriceForAllNightsWithTickets(reservation)
              )
            }}</strong>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
