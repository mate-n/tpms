<script setup lang="ts">
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import { DateFormatter } from '@/helpers/DateFormatter'
import { ReservationService } from '@/services/backend-middleware/ReservationService'
import type { IReservationLookupBody } from '@/shared/interfaces/IReservationLookupBody'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const dateFormatter = new DateFormatter()
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const reservationService = new ReservationService(axios2)
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const emit = defineEmits(['close', 'ok', 'payLater', 'clickOnSubmitButton'])
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
  return itineraryReservation.value.protelReservations.map((item) => item.id)
})

const firstDepositDate: Ref<Date | undefined> = ref(undefined)
const secondDepositDate: Ref<Date | undefined> = ref(undefined)
const thirdDepositDate: Ref<Date | undefined> = ref(undefined)

const firstDepositAmount = ref(0)
const secondDepositAmount = ref(0)
const thirdDepositAmount = ref(0)

onMounted(() => {
  const reservationLookUpBody: IReservationLookupBody = {
    crsNo: itineraryReservationCartStore.getCartNumber(),
    reservationNo: undefined,
    profileId: undefined
  }
  reservationService.lookup(reservationLookUpBody).then((res) => {
    if (res.length > 0) {
      if (res[0].depositDeadline1date) {
        firstDepositDate.value = new Date(res[0].depositDeadline1date)
      }
      if (res[0].depositDeadline2date) {
        secondDepositDate.value = new Date(res[0].depositDeadline2date)
      }
      if (res[0].depositDeadline3date) {
        thirdDepositDate.value = new Date(res[0].depositDeadline3date)
      }
      if (res[0].depositDeadline1amount) {
        firstDepositAmount.value = parseInt(res[0].depositDeadline1amount)
        amountSpecifiedByUser.value = parseInt(res[0].depositDeadline1amount)
      }
      if (res[0].depositDeadline2amount) {
        secondDepositAmount.value = parseInt(res[0].depositDeadline2amount)
      }
      if (res[0].depositDeadline3amount) {
        thirdDepositAmount.value = parseInt(res[0].depositDeadline3amount)
      }
    }
    console.log(res)
  })
})

const amountSpecifiedByUser = ref(0)
const clickOnSubmitButton = () => {
  emit('clickOnSubmitButton', totalPrice)
}

const firstDepositSelected = ref(false)
const secondDepositSelected = ref(false)
const thirdDepositSelected = ref(false)

const isAnyCheckboxChecked = computed(() => {
  return firstDepositSelected.value || secondDepositSelected.value || thirdDepositSelected.value
})

const totalPriceToSubmit = computed(() => {
  let total = 0

  if (isAnyCheckboxChecked.value) {
    if (firstDepositSelected.value) {
      total += amountSpecifiedByUser.value
    }
    if (secondDepositSelected.value) {
      total += secondDepositAmount.value
    }
    if (thirdDepositSelected.value) {
      total += thirdDepositAmount.value
    }
  } else {
    total = amountSpecifiedByUser.value
  }

  return total
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
        <v-col class="font-weight-bold">Itinerary Number</v-col>
        <v-col class="font-weight-bold">Reservation Total</v-col>
      </v-row>
      <v-row>
        <v-col>{{ itineraryReservationCartStore.getCartNumber() }}</v-col>
        <v-col>{{ priceFormatter.formatPrice(totalPrice) }}</v-col>
      </v-row>
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

      <v-divider class="my-5"></v-divider>
      <template v-if="firstDepositDate">
        <v-row>
          <v-col class="font-weight-bold"></v-col>
          <v-col class="font-weight-bold">Due Date</v-col>
          <v-col class="font-weight-bold">Amount</v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>First Deposit</v-col>
          <v-col>{{ dateFormatter.dddotmmdotyyyy(firstDepositDate) }}</v-col>
          <v-col> {{ priceFormatter.formatPrice(firstDepositAmount) }}</v-col>
          <v-col><v-checkbox v-model="firstDepositSelected" label="Select"></v-checkbox></v-col>
        </v-row>
        <v-divider class="mb-2"></v-divider>
      </template>
      <template v-if="secondDepositDate">
        <v-row>
          <v-col class="font-weight-bold"></v-col>
          <v-col class="font-weight-bold">Due Date</v-col>
          <v-col class="font-weight-bold">Amount</v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>Second Deposit</v-col>
          <v-col>{{ dateFormatter.dddotmmdotyyyy(secondDepositDate) }}</v-col>
          <v-col>{{ priceFormatter.formatPrice(secondDepositAmount) }}</v-col>
          <v-col><v-checkbox v-model="secondDepositSelected" label="Select"></v-checkbox></v-col>
        </v-row>
        <v-divider class="mb-2"></v-divider>
      </template>
      <template v-if="thirdDepositDate">
        <v-row>
          <v-col class="font-weight-bold"></v-col>
          <v-col class="font-weight-bold">Due Date</v-col>
          <v-col class="font-weight-bold">Amount</v-col>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col>Third Deposit</v-col>
          <v-col>{{ dateFormatter.dddotmmdotyyyy(thirdDepositDate) }}</v-col>
          <v-col>{{ priceFormatter.formatPrice(thirdDepositAmount) }}</v-col>
          <v-col><v-checkbox v-model="thirdDepositSelected" label="Select"></v-checkbox></v-col>
        </v-row>
        <v-divider class="mb-2"></v-divider>
      </template>
      <template v-if="!isAnyCheckboxChecked">
        <v-row>
          <v-col cols="3">Specify Amount:</v-col>
          <v-col>
            <v-number-input
              :min="firstDepositAmount"
              v-model="amountSpecifiedByUser"
            ></v-number-input
          ></v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
      </template>

      <v-row>
        <v-col class="font-weight-bold" cols="3">Total:</v-col>
        <v-col> {{ priceFormatter.formatPrice(totalPriceToSubmit) }}</v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>

      <div class="d-flex justify-center mt-5">
        <v-btn class="me-5" @click="emit('payLater')">Pay Later</v-btn>
        <v-btn class="primary-button" @click="clickOnSubmitButton()">SUBMIT</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
