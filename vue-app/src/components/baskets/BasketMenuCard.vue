<script setup lang="ts">
import { computed } from 'vue'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import ProtelReservationInBasketMenuCard from './ProtelReservationInBasketMenuCard.vue'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { IdentityHelper } from '@/helpers/IdentityHelper'
const identityHelper = new IdentityHelper()
const priceFormatter = new PriceFormatter()
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const itineraryReservationCartStore = useItineraryReservationCartStore()
const emit = defineEmits(['close', 'clickOnViewCart'])
const removeAllReservations = () => {
  if (itineraryReservationCartStore.itineraryReservation) {
    itineraryReservationCartStore.itineraryReservation.protelReservations = []
  }
  emit('close')
}

const removeReservation = (reservation: IProtelReservation) => {
  if (!itineraryReservationCartStore.itineraryReservation) {
    return
  }
  itineraryReservationCartStore.itineraryReservation.protelReservations =
    itineraryReservationCartStore.itineraryReservation.protelReservations.filter(
      (r) => !identityHelper.isSame(r, reservation)
    )
}

const totalPrice = computed(() => {
  let total = 0
  if (itineraryReservationCartStore.itineraryReservation) {
    for (const reservation of itineraryReservationCartStore.itineraryReservation
      .protelReservations) {
      total += protelReservationPriceCalculator.getPriceForAllNightsWithTickets(reservation)
    }
  }

  return total
})

const clickOnViewCart = () => {
  emit('clickOnViewCart')
}
</script>
<template>
  <v-container class="bg-lightgray pa-1 rounded">
    <div style="overflow-y: auto; max-height: 90vh">
      <template v-if="itineraryReservationCartStore.itineraryReservation">
        <ProtelReservationInBasketMenuCard
          v-for="(reservation, index) in itineraryReservationCartStore.itineraryReservation
            .protelReservations"
          :key="index"
          :reservation="reservation"
          @removeReservation="
            (protelReservation: IProtelReservation) => removeReservation(reservation)
          "
        ></ProtelReservationInBasketMenuCard>
      </template>
    </div>
    <v-card min-width="350" class="mb-2 px-2">
      <div>
        <p><strong>Total: </strong></p>
        <p class="text-end">
          <strong>{{ priceFormatter.formatPrice(totalPrice) }}</strong>
        </p>
      </div>
    </v-card>
    <div class="d-flex justify-end mt-3">
      <v-btn class="me-2 text-black" @click="removeAllReservations()">Empty Cart</v-btn>
      <v-btn class="primary-button" @click="clickOnViewCart()">View Cart</v-btn>
    </div>
  </v-container>
</template>
