<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed } from 'vue'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import AvailabilityGroupInBasketMenuCard from './AvailabilityGroupInBasketMenuCard.vue'
import ProtelReservationInBasketMenuCard from './ProtelReservationInBasketMenuCard.vue'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
const priceFormatter = new PriceFormatter()
const availabilityGroupHelper = new AvailabilityGroupHelper()
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const itineraryReservationCartStore = useItineraryReservationCartStore()
const emit = defineEmits(['close', 'clickOnViewCart'])
const basketItemsStore = useBasketItemsStore()
const removeAllReservations = () => {
  if (itineraryReservationCartStore.itineraryReservation) {
    itineraryReservationCartStore.itineraryReservation.protelReservations = []
  }
  emit('close')
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

const availabilityGroupsOfReservations = computed(() => {
  return availabilityGroupHelper.getAvailabilityGroupsFromReservations(
    basketItemsStore.reservations
  )
})
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
          @removeReservation="removeAllReservations"
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
