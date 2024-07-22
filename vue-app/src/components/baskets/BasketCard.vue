<script setup lang="ts">
import { computed, inject, onMounted, ref, type Ref } from 'vue'
import router from '@/router'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import type { AxiosStatic } from 'axios'
import { CartService } from '@/services/backend-middleware/CartService'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import ProtelReservationInBasketCard from './ProtelReservationInBasketCard.vue'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { IdentityHelper } from '@/helpers/IdentityHelper'
import { ItineraryReservationCartManager } from '@/helpers/ItineraryReservationCartManager'
import { CampService } from '@/services/backend-middleware/CampService'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import { SyncCartItemService } from '@/services/backend-middleware/SyncCartItemService'
import ProcessPayment from '@/components/reservations/ProcessPayment.vue'
const itineraryReservationCartManager = new ItineraryReservationCartManager()
const confirmationNumbers = ref<string[]>([])
const identityHelper = new IdentityHelper()
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const cartService = new CartService(axios2)
const syncCartItemService = new SyncCartItemService()
const priceFormatter = new PriceFormatter()
const campService = new CampService(axios2)
const itineraryReservationCartStore = useItineraryReservationCartStore()
const emits = defineEmits(['close'])
const camps = ref<IProtelCamp[]>([])

const removeAllReservations = () => {
  if (itineraryReservationCartStore.itineraryReservation) {
    for (const reservation of itineraryReservationCartStore.itineraryReservation
      .protelReservations) {
      removeReservation(reservation)
    }
  }
}

const removeReservation = (reservation: IProtelReservation) => {
  if (!itineraryReservationCartStore.itineraryReservation) {
    return
  }
  syncCartItemService.syncItemToCart('delete', reservation)

  itineraryReservationCartStore.itineraryReservation.protelReservations =
    itineraryReservationCartStore.itineraryReservation.protelReservations.filter(
      (r) => !identityHelper.isSame(r, reservation)
    )
}

const cartNumber: Ref<string | null> = ref(null)

const totalPrice = computed(() => {
  let total = 0
  if (itineraryReservationCartStore.itineraryReservation) {
    total = protelReservationPriceCalculator.getTotalPriceOfItineraryReservation(
      itineraryReservationCartStore.itineraryReservation
    )
  }
  return total
})

const wantToPayNow = ref(false)

const clickOnPayNow = () => {
  if (checkIfBookingIsPossible()) {
    wantToPayNow.value = true
    //book(totalPrice.value.toString())
    paymentProcessDialog.value = true
  }
}

const clickOnPayLater = () => {
  if (checkIfBookingIsPossible()) {
    wantToPayNow.value = false
    book('0')
  }
}

const checkIfBookingIsPossible = () => {
  errors.value = []

  const isProfilePresent = itineraryReservationCartStore.getProfileNumber()

  if (!isProfilePresent) {
    errors.value.push('Please add a profile to the reservation before booking.')
    errorsDialog.value = true
    return false
  }
  return true
}

const book = (totalPrice: string) => {
  const reservations = itineraryReservationCartStore.itineraryReservation?.protelReservations || []
  for (const reservation of reservations) {
    /*
      Update items with cartItemID in cart or Add items without cartItemID to cart
    */
    syncCartItemService.syncItemToCart(reservation.cartITemID ? 'edit' : 'add', reservation)
  }

  /*
    settleAnkerdataCart()
    */
  itineraryReservationCartManager
    .settleCart(itineraryReservationCartStore.getCartNumber(), totalPrice, cartService)
    .then(() => {
      cartNumber.value = itineraryReservationCartStore.getCartNumber()

      cartService.retrieveCart(cartNumber.value!).then((data) => {
        console.log('retrieve Cart data', data)
        confirmationNumbers.value = []
        for (const item of data['cart_items']) {
          let campName = ''
          const foundCamp = camps.value.find((camp) => camp.id == parseInt(item['camp_id']))
          if (foundCamp) {
            campName = foundCamp.name
          }
          confirmationNumbers.value.push(item['confirmation'] + ' - ' + campName)
        }
      })
    })
  errors.value = []
  itineraryConfirmedDialog.value = true
}

const errors = ref<string[]>([])
const errorsDialog = ref(false)
const itineraryConfirmedDialog = ref(false)
const paymentProcessDialog = ref(false)

const clickOnOkInConfirmedDialog = () => {
  router.push('/itinerary-reservations')
  emits('close')
}

const itineraryReservationProfile: Ref<IProfile> = ref(new Profile())

onMounted(() => {
  getProfileOfItineraryReservation
  campService.findAll().then((response: IProtelCamp[]) => {
    camps.value = response
  })
})

const getProfileOfItineraryReservation = () => {
  if (itineraryReservationCartStore.itineraryReservation?.guestProfileID === undefined) {
    return
  }
  profileService
    .get(itineraryReservationCartStore.itineraryReservation?.guestProfileID)
    .then((response: IProfile | undefined) => {
      if (response) {
        itineraryReservationProfile.value = response
        if (response && response.id) {
          itineraryReservationCartStore.setProfileNumber(response.id.toString())

          itineraryReservationCartManager.updateCart(
            response.id.toString(),
            itineraryReservationCartStore.getCartNumber(),
            cartService
          )
        }
      }
    })
}

const profileSelected = (selectedProfile: IProfile) => {
  if (itineraryReservationCartStore.itineraryReservation) {
    itineraryReservationCartStore.itineraryReservation.guestProfileID = selectedProfile.id
  }
  itineraryReservationProfile.value = selectedProfile

  if (selectedProfile && selectedProfile.id) {
    itineraryReservationCartStore.setProfileNumber(selectedProfile.id.toString())
    itineraryReservationCartManager.updateCart(
      selectedProfile.id.toString(),
      itineraryReservationCartStore.getCartNumber(),
      cartService
    )
  }
}
</script>

<template>
  <div class="standard-dialog-card" data-cy="basket_card">
    <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
      <v-toolbar-title><span class="text-primary">Basket</span></v-toolbar-title>
      <div @click="clickOnPayLater()" class="profiles-card-toolbar-button">Confirm Cart</div>
      <div class="profiles-card-toolbar-button" @click="removeAllReservations()">
        <v-icon size="large">mdi-timer-sand-empty</v-icon> Empty Cart
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <div
        v-for="(reservation, index) of itineraryReservationCartStore.itineraryReservation
          ?.protelReservations"
        :key="reservation.localID"
      >
        <template v-if="itineraryReservationCartStore.itineraryReservation">
          <ProtelReservationInBasketCard
            v-model="itineraryReservationCartStore.itineraryReservation.protelReservations[index]"
            :profile="itineraryReservationProfile"
            @profile-selected="(profile: IProfile) => profileSelected(profile)"
            @remove-reservation="
              (protelReservation: IProtelReservation) => removeReservation(protelReservation)
            "
          ></ProtelReservationInBasketCard>
        </template>
      </div>

      <div class="d-flex justify-end align-center">
        <v-card class="me-2">
          <v-card-text>
            <p>
              <strong data-cy="total_all"
                >Total: {{ priceFormatter.formatPrice(totalPrice) }}</strong
              >
            </p>
          </v-card-text>
        </v-card>
        <v-btn class="me-2" @click="clickOnPayNow()">Pay Now</v-btn>
        <v-btn elevation="4" @click="clickOnPayLater()">Pay Later</v-btn>
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
        <div class="mb-5">
          <div>Your itinerary reservation: "{{ cartNumber }}" has been successfully booked.</div>
          <div>
            Confirmation numbers:
            <ul class="ms-4">
              <li v-for="confirmationNumber in confirmationNumbers" :key="confirmationNumber">
                {{ confirmationNumber }}
              </li>
            </ul>
          </div>
          <div v-if="wantToPayNow">Please proceed to Protel Cloud PMS to complete payment.</div>
        </div>
        <div class="d-flex justify-end">
          <v-btn class="me-2" @click="itineraryConfirmedDialog = false">Close</v-btn>
          <v-btn class="primary-button" @click="clickOnOkInConfirmedDialog()">OK</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="paymentProcessDialog" width="800" scrollable>
    <v-card v-if="itineraryReservationCartStore.itineraryReservation">
      <ProcessPayment
        v-model="itineraryReservationCartStore.itineraryReservation"
        @close="paymentProcessDialog = false"
        @pay-later="clickOnPayLater()"
      ></ProcessPayment>
    </v-card>
  </v-dialog>
</template>
