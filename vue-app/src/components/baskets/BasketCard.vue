<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed, inject, ref, type Ref } from 'vue'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import router from '@/router'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import AvailabilityGroupInBasketCard from './AvailabilityGroupInBasketCard.vue'
import ConservationFeeForm from '@/components/conservation-fees/ConservationFeeForm.vue'
import type { AxiosStatic } from 'axios'
import { CartService } from '@/services/backend-middleware/CartService'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import type { ICartBody } from '@/shared/interfaces/cart/ICartBody'
import type { IUpdateCartBody } from '@/shared/interfaces/cart/IUpdateCartBody'
import type { IAddItemToCartBody } from '@/shared/interfaces/cart/IAddItemToCartBody'
import { AddItemToCartBody } from '@/shared/classes/AddItemToCartBody'
import { ReservationConverter } from '@/shared/converters/ReservationConverter'
import { DateFormatter } from '@/helpers/DateFormatter'
import type { ISettleCartBody } from '@/shared/interfaces/cart/ISettleCartBody'
const dateFormatter = new DateFormatter()
const axios2: AxiosStatic | undefined = inject('axios2')
const cartService = new CartService(axios2)
const availabilityGroupHelper = new AvailabilityGroupHelper()
const priceFormatter = new PriceFormatter()
const basketItemsStore = useBasketItemsStore()
const reservationHelper = new ReservationHelper()
const reservationConverter = new ReservationConverter()
const emits = defineEmits(['close'])
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}

const cartNumber: Ref<string | null> = ref(null)

const totalPrice = computed(() => {
  return availabilityGroupHelper.calculateTotalPrice(availabilityGroups.value)
})

const clickOnBook = () => {
  checkIfBookingIsPossible()
}

const settleAnkerdataCart = () => {
  const cartBody: ICartBody = {
    action: 'create',
    profile_number: '639',
    cart_type: 2
  }

  cartService
    .createCart(cartBody)
    .then((createCartResponseBody: CreateCartResponseBody) => {
      cartNumber.value = createCartResponseBody.cart_number
      return updateCart()
    })
    .then(() => {
      return addItemsToCart()
    })
    .then(() => {
      const settleCartBody: ISettleCartBody = {
        action: 'updatePayment',
        cart_number: cartNumber.value!,
        payment_ref: 'REF123456789',
        payment_amount: '123',
        payment_method: 'AHSPAYMENTPROCESSOR',
        status: 'Confirmed'
      }
      cartService.settleCart(settleCartBody).then((res) => {
        console.log(res)
      })
    })
}

const updateCart = () => {
  return new Promise((resolve, reject) => {
    if (cartNumber.value === null) {
      reject()
    }

    const cartBody: IUpdateCartBody = {
      action: 'updateProfile',
      cart_number: cartNumber.value!,
      profile_number: '639'
    }

    cartService.updateCart(cartBody).then((res) => {
      resolve(res)
    })
  })
}

const addItemsToCart = () => {
  return new Promise((resolve) => {
    for (const availabilityGroup of availabilityGroups.value) {
      const reservations = reservationConverter.convertToReservations(
        availabilityGroup.availabilities
      )

      for (const reservation of reservations) {
        const newItem: IAddItemToCartBody = new AddItemToCartBody()
        newItem.action = 'add'
        newItem.cart_id = cartNumber.value!
        newItem.arrival_date = dateFormatter.yyyydashmmdashdd(reservation.arrivalDate)
        newItem.departure_date = dateFormatter.yyyydashmmdashdd(reservation.departureDate)
        newItem.adults = 1
        newItem.children = 0
        newItem.units = reservation.numberOfRooms
        if (reservation.roomTypeCode) {
          newItem.type_code = reservation.roomTypeCode
        }
        if (reservation.propertyID) {
          newItem.property_code = reservation.propertyID
        }
        cartService.addItemToCart(newItem)
      }
      resolve('')
    }

    const newItem: IAddItemToCartBody = new AddItemToCartBody()
    newItem.action = 'add'
    newItem.cart_id = cartNumber.value!
    newItem.arrival_date = '2024-07-01'
    newItem.departure_date = '2024-07-07'
    cartService.addItemToCart(newItem).then((res) => {
      resolve(res)
    })
  })
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
    settleAnkerdataCart()
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
