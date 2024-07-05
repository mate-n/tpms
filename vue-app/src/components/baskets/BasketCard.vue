<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed, ref } from 'vue'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import router from '@/router'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import AvailabilityGroupInBasketCard from './AvailabilityGroupInBasketCard.vue'
import ConservationFeeForm from '@/components/conservation-fees/ConservationFeeForm.vue'
const availabilityGroupHelper = new AvailabilityGroupHelper()
const priceFormatter = new PriceFormatter()
const basketItemsStore = useBasketItemsStore()
const reservationHelper = new ReservationHelper()
const emits = defineEmits(['close'])
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}

const totalPrice = computed(() => {
  return availabilityGroupHelper.calculateTotalPrice(availabilityGroups.value)
})

const clickOnBook = () => {
  checkIfBookingIsPossible()
}

const allowBook = computed(() => {
  return (
    basketItemsStore.reservations.length > 0 &&
    reservationHelper.doAllReservationsHaveProfileID(basketItemsStore.reservations)
  )
})

const checkIfBookingIsPossible = () => {
  if (!allowBook.value) {
    errors.value = []

    errors.value.push('Please add a profile to the reservation before booking.')
    errorsDialog.value = true
  } else {
    errors.value = []
    itineraryConfirmedDialog.value = true
  }
}

const errors = ref<string[]>([])
const errorsDialog = ref(false)
const itineraryConfirmedDialog = ref(false)

const clickOnOkInConfirmedDialog = () => {
  router.push('/itinerary-reservations')
  emits('close')
}

const availabilityGroups = computed(() => {
  return availabilityGroupHelper.getAvailabilityGroupsFromReservations(
    basketItemsStore.reservations
  )
})

const conservationFeeFormDialog = ref(false)
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
      <v-toolbar-title><span class="text-primary">Basket</span></v-toolbar-title>
      <div @click="clickOnBook()" class="profiles-card-toolbar-button">Confirm Cart</div>
      <div class="profiles-card-toolbar-button" @click="removeAllReservations()">
        <v-icon size="large">mdi-timer-sand-empty</v-icon> Empty Cart
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <div v-for="(availabilityGroup, index) of availabilityGroups" :key="availabilityGroup.id">
        <AvailabilityGroupInBasketCard v-model="availabilityGroups[index]" />
      </div>

      <div class="d-flex justify-end align-center">
        <v-card class="me-2">
          <v-card-text>
            <p>
              <strong>Total: {{ priceFormatter.formatPrice(totalPrice) }}</strong>
            </p>
          </v-card-text>
        </v-card>
        <v-btn class="me-2" elevation="4" @click="conservationFeeFormDialog = true"
          >Conservation Fees</v-btn
        >
        <v-btn style="background-color: green; color: white" elevation="4" @click="clickOnBook()"
          >BOOK</v-btn
        >
      </div>
    </v-container>
  </div>

  <v-dialog v-model="errorsDialog" width="500">
    <v-card>
      <v-toolbar class="standard-dialog-card-toolbar">
        <v-toolbar-title><span class="text-primary">Errors</span></v-toolbar-title>
        <div class="standard-card-toolbar-button rounded-te" @click="errorsDialog = false">
          <v-icon size="large">mdi-close</v-icon>
        </div>
      </v-toolbar>
      <v-divider class="standard-card-divider"></v-divider>
      <v-card-text>
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="itineraryConfirmedDialog" scrollable width="600">
    <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
      <v-toolbar-title
        ><span class="text-primary">Itinerary Reservation Confirmed</span></v-toolbar-title
      >
      <div
        class="profiles-card-toolbar-button rounded-te"
        @click="itineraryConfirmedDialog = false"
      >
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-card class="rounded-t-0">
      <v-card-text>
        <div class="mb-5">Your itinerary reservation has been suceessfully booked.</div>
        <div class="d-flex justify-end">
          <v-btn class="me-2" @click="itineraryConfirmedDialog = false">Close</v-btn>
          <v-btn class="primary-button" @click="clickOnOkInConfirmedDialog()">OK</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="conservationFeeFormDialog" scrollable>
    <v-card>
      <ConservationFeeForm
        :number-of-adults="2"
        :number-of-nights="7"
        :number-of-children="1"
      ></ConservationFeeForm>
    </v-card>
  </v-dialog>
</template>
