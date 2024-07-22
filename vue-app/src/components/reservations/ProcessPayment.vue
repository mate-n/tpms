<script setup lang="ts">
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import DateSelecter from '@/components/dates/DateSelecter.vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const emit = defineEmits(['close', 'ok', 'payLater'])
const itineraryReservationCartStore = useItineraryReservationCartStore()
const priceFormatter = new PriceFormatter()

const itineraryReservation = defineModel({
  required: true,
  type: Object as () => IItineraryReservation
})

const profile: Ref<IProfile | undefined> = ref(undefined)

watch(
  () => itineraryReservation.value.guestProfileID,
  async (newProfileID) => {
    if (newProfileID) {
      profile.value = await profileService.get(newProfileID)
    }
  },
  { immediate: true, deep: true }
)

const totalPrice = computed(() => {
  let total = 0
  total = protelReservationPriceCalculator.getTotalPriceOfItineraryReservation(
    itineraryReservation.value
  )
  return total
})

const reservationCartItemIDs = computed(() => {
  return itineraryReservation.value.protelReservations.map((item) => item.cartITemID)
})

const firstDepositDate = ref(new Date())
const secondDepositDate = ref(new Date())

const firstDepositAmount = ref(0)
const secondDepositAmount = ref(0)

onMounted(() => {
  firstDepositAmount.value = totalPrice.value / 2
  secondDepositAmount.value = totalPrice.value / 2
})
</script>

<template>
  <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
    <v-toolbar-title><span class="text-primary">Process Payment</span></v-toolbar-title>
    <div class="profiles-card-toolbar-button rounded-te">
      ProfileID: {{ itineraryReservation.guestProfileID }}
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="profiles-card-divider"></v-divider>
  <v-card class="rounded-t-0">
    <v-card-text>
      <v-row>
        <v-col class="font-weight-bold">Reservation Number</v-col>
        <v-col class="font-weight-bold">LastName, First Name</v-col>
      </v-row>
      <v-row>
        <v-col
          >#<span v-for="(id, index) of reservationCartItemIDs" :key="id"
            >{{ id }}<span v-if="index + 1 != reservationCartItemIDs.length">, </span></span
          >
        </v-col>
        <v-col>{{ profile?.surname }}, {{ profile?.name }} </v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold">Itinerary Number</v-col>
        <v-col class="font-weight-bold">Reservation Total</v-col>
      </v-row>
      <v-row>
        <v-col>{{ itineraryReservationCartStore.getCartNumber() }}</v-col>
        <v-col>{{ priceFormatter.formatPrice(totalPrice) }}</v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-col class="font-weight-bold"></v-col>
        <v-col class="font-weight-bold">Due Date</v-col>
        <v-col class="font-weight-bold">Amount</v-col>
      </v-row>
      <v-row>
        <v-col>First Deposit</v-col>
        <v-col><DateSelecter label=" " v-model="firstDepositDate"></DateSelecter></v-col>
        <v-col><v-number-input :min="0" v-model="firstDepositAmount"></v-number-input></v-col>
      </v-row>
      <v-row>
        <v-col class="font-weight-bold"></v-col>
        <v-col class="font-weight-bold">Due Date</v-col>
        <v-col class="font-weight-bold">Amount</v-col>
      </v-row>
      <v-row>
        <v-col>Second Deposit</v-col>
        <v-col><DateSelecter label=" " v-model="secondDepositDate"></DateSelecter></v-col>
        <v-col><v-number-input :min="0" v-model="secondDepositAmount"></v-number-input></v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>

      <div class="d-flex justify-center mt-5">
        <v-btn class="me-5" @click="emit('payLater')">Pay Later</v-btn>
        <v-btn class="primary-button">SUBMIT</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
