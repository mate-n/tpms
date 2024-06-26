<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed } from 'vue'
import ReservationInBasketMenuCard from './ReservationInBasketMenuCard.vue'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import AvailabilityGroupInBasketCard from './AvailabilityGroupInBasketCard.vue'
const availabilityGroupHelper = new AvailabilityGroupHelper()
const reservationHelper = new ReservationHelper()
const emit = defineEmits(['close', 'clickOnViewCart'])
const basketItemsStore = useBasketItemsStore()
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
  emit('close')
}
const removeReservation = () => {
  if (basketItemsStore.reservations.length === 0) {
    emit('close')
  }
}

const totalPrice = computed(() => {
  {
    {
      return reservationHelper.getTotalPrice(basketItemsStore.reservations)
    }
  }
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
      <AvailabilityGroupInBasketCard
        v-for="availabilityGroup in availabilityGroupsOfReservations"
        :key="availabilityGroup.id"
        :availabilityGroup="availabilityGroup"
        :guestsPerRoom="basketItemsStore.reservations[0].guestsPerRoom"
      ></AvailabilityGroupInBasketCard>
    </div>
    <v-card min-width="350" class="mb-2 px-2">
      <div>
        <p><strong>Total: </strong></p>
        <p class="text-end">
          <strong>{{ totalPrice }}</strong>
        </p>
      </div>
    </v-card>
    <div class="d-flex justify-end mt-3">
      <v-btn class="me-2 text-black" @click="removeAllReservations()">Empty Cart</v-btn>
      <v-btn class="primary-button" @click="clickOnViewCart()">View Cart</v-btn>
    </div>
  </v-container>
</template>
