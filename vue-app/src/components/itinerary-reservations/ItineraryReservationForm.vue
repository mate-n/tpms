<script setup lang="ts">
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import ProfileGeneralForm from '@/components/profiles/ProfileGeneralForm.vue'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import ReservationSlice from './ReservationSlice.vue'
import type { IReservationSelectable } from '@/shared/interfaces/reservations/IReservationSelectable'
import ReservationCards from '@/components/reservations/ReservationCards.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { AxiosStatic } from 'axios'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import { ItineraryReservationHelper } from '@/helpers/ItineraryReservationHelper'
import { DateFormatter } from '@/helpers/DateFormatter'
import { ItineraryReservationCloner } from '@/helpers/ItineraryReservationCloner'
import { DateHelper } from '@/helpers/DateHelper'
import { ItineraryReservationMover } from '@/helpers/ItineraryReservationMover'
import { SyncCartItemService } from '@/services/backend-middleware/SyncCartItemService'
import ProtelReservationsTable from '../reservations/ProtelReservationsTable.vue'
import router from '@/router'
import DateSelecter from '@/components/dates/DateSelecter.vue'
const itineraryReservationMover = new ItineraryReservationMover()
const dateHelper = new DateHelper()
const dateFormatter = new DateFormatter()
const itineraryReservationHelper = new ItineraryReservationHelper()
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const syncCartItemService = new SyncCartItemService(axios2)
const itineraryReservationCloner = new ItineraryReservationCloner()
const props = defineProps({
  itineraryReservationInput: { type: Object as () => IItineraryReservation, required: true }
})
const itineraryReservationToBeEdited = ref<IItineraryReservation>(new ItineraryReservation())

watch(
  props.itineraryReservationInput,
  (newInput) => {
    itineraryReservationToBeEdited.value = itineraryReservationCloner.clone(newInput)

    if (itineraryReservationToBeEdited.value.guestProfileID) {
      profileService.get(itineraryReservationToBeEdited.value.guestProfileID).then((response) => {
        if (response) {
          profileAssociatedWithItineraryReservation.value = response
        }
      })
    }
  },
  { immediate: true, deep: true }
)

const reservationSelectables: Ref<IReservationSelectable[]> = ref([])
const profileAssociatedWithItineraryReservation = ref<IProfile>(new Profile())

const selectReservation = (reservationSelectable: IReservationSelectable) => {
  reservationSelectables.value.forEach((reservationSelectable) => {
    reservationSelectable.selected = false
  })
  reservationSelectable.selected = true
}

const selectedReservation = computed(() => {
  return reservationSelectables.value.find(
    (reservationSelectable) => reservationSelectable.selected
  )
})

const startDate = computed(() => {
  const startDateFromItinerary = itineraryReservationHelper.getStartDate(
    itineraryReservationToBeEdited.value
  )
  if (startDateFromItinerary) {
    return startDateFromItinerary
  }
  return new Date()
})

const endDate = computed(() => {
  const endDateFromItinerary = itineraryReservationHelper.getEndDate(
    itineraryReservationToBeEdited.value
  )
  if (endDateFromItinerary) {
    return endDateFromItinerary
  }
  return new Date()
})

const newWouldBeStartDate = computed(() => {
  const startDate = itineraryReservationHelper.getStartDate(itineraryReservationToBeEdited.value)
  if (startDate) {
    return dateHelper.addDays(startDate, daysToMove.value)
  }
  return new Date()
})

const newWouldBeEndDate = computed(() => {
  const endDate = itineraryReservationHelper.getEndDate(itineraryReservationToBeEdited.value)
  if (endDate) {
    return dateHelper.addDays(endDate, daysToMove.value)
  }
  return new Date()
})

const newWouldBeStartDateForEarlierDate = computed(() => {
  const startDate = itineraryReservationHelper.getStartDate(itineraryReservationToBeEdited.value)
  if (startDate) {
    return dateHelper.addDays(startDate, daysToMoveForEarlierDate.value)
  }
  return new Date()
})

const newWouldBeStartDateForLaterDate = computed(() => {
  const endDate = itineraryReservationHelper.getEndDate(itineraryReservationToBeEdited.value)
  if (endDate) {
    return dateHelper.addDays(endDate, daysToMoveForLaterDate.value)
  }
  return new Date()
})

const daysToMove = ref(0)
const daysToMoveForEarlierDate = ref(0)
const daysToMoveForLaterDate = ref(0)

const moveEntiryItineraryReservation = () => {
  itineraryReservationMover.move(itineraryReservationToBeEdited.value, daysToMove.value)
  daysToMove.value = 0
}

const extendFirstReservationsToAnEarlierDate = () => {
  itineraryReservationMover.extendFirstReservationsToAnEarlierDate(
    itineraryReservationToBeEdited.value,
    daysToMoveForEarlierDate.value
  )
  daysToMoveForEarlierDate.value = 0
}

const extendLastReservationsToALaterDate = () => {
  itineraryReservationMover.extendLastReservationsToALaterDate(
    itineraryReservationToBeEdited.value,
    daysToMoveForLaterDate.value
  )
  daysToMoveForLaterDate.value = 0
}

const save = () => {
  syncCartItemService
    .synchronizeFrontendCartWithBackendCart(
      itineraryReservationToBeEdited.value,
      itineraryReservationToBeEdited.value.cart_number
    )
    .then((response) => {
      alert('Saved')
    })
}

const goToEnquiryView = () => {
  router.push('/itinerary-reservation-enquiry/' + itineraryReservationToBeEdited.value.cart_number)
}

const daysToMoveDateSelect = ref(new Date())

onMounted(() => {
  const newDaysToMoveDateSelect = itineraryReservationHelper.getStartDate(
    itineraryReservationToBeEdited.value
  )

  if (newDaysToMoveDateSelect) {
    daysToMoveDateSelect.value = newDaysToMoveDateSelect
  }
})

const daysToMoveUpdated = () => {
  daysToMoveDateSelect.value = newWouldBeStartDate.value
}

const daysToMoveDateSelectUpdated = () => {
  const oldStartDate = itineraryReservationHelper.getStartDate(itineraryReservationToBeEdited.value)
  if (oldStartDate) {
    daysToMove.value = dateHelper.daysBetweenDates(daysToMoveDateSelect.value, oldStartDate)
  }
}
</script>
<template>
  <v-toolbar class="bg-primary">
    <v-toolbar-title
      ><v-icon>mdi-account-circle-outline</v-icon>
      {{ profileAssociatedWithItineraryReservation.name }}
      {{ profileAssociatedWithItineraryReservation.surname }}</v-toolbar-title
    >
  </v-toolbar>
  <ProfileGeneralForm v-model="profileAssociatedWithItineraryReservation"></ProfileGeneralForm>
  <v-toolbar class="bg-lightgray">
    <div class="h-100 d-flex px-5 align-center me-auto font-size-rem-14">
      Itinerary Reservations
      <v-icon class="mx-3" size="x-small">mdi-arrow-right</v-icon> #{{
        itineraryReservationToBeEdited.cart_number
      }}
    </div>
    <v-btn @click="save()" class="primary-button text-uppercase">Save</v-btn>
  </v-toolbar>
  <v-container fluid>
    <v-row>
      <v-col cols="2" class="font-weight-bold"> Start Date </v-col>
      <v-col cols="2" class="font-weight-bold"> End Date </v-col>
    </v-row>
    <v-row>
      <v-col cols="2"> {{ dateFormatter.dddotmmdotyyyy(startDate) }} </v-col>
      <v-col cols="2"> {{ dateFormatter.dddotmmdotyyyy(endDate) }} </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn @click="moveEntiryItineraryReservation()"
          >Move entire Itinerary Reservation by number of days</v-btn
        >
      </v-col>
      <v-col>
        <v-number-input
          label="Days"
          v-model="daysToMove"
          @update:model-value="daysToMoveUpdated()"
        ></v-number-input>
      </v-col>
      <v-col
        ><DateSelecter
          label="Date"
          v-model="daysToMoveDateSelect"
          @update:model-value="daysToMoveDateSelectUpdated()"
        ></DateSelecter
      ></v-col>
      <v-col>
        New Start Date would be:
        <br />
        {{ dateFormatter.dddotmmdotyyyy(newWouldBeStartDate) }}
      </v-col>
      <v-col>
        New End Date would be:
        <br />

        {{ dateFormatter.dddotmmdotyyyy(newWouldBeEndDate) }}</v-col
      >
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn @click="extendFirstReservationsToAnEarlierDate()"
          >Extend first reservations to an earlier date</v-btn
        >
      </v-col>
      <v-col>
        <v-number-input label="Days" v-model="daysToMoveForEarlierDate" :max="0"></v-number-input>
      </v-col>
      <v-col>
        <v-col>
          New Start Date would be:
          <br />
          {{ dateFormatter.dddotmmdotyyyy(newWouldBeStartDateForEarlierDate) }}
        </v-col>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn @click="extendLastReservationsToALaterDate()"
          >Extend last reservations to a later date</v-btn
        >
      </v-col>
      <v-col>
        <v-number-input label="Days" v-model="daysToMoveForLaterDate" :min="0"></v-number-input>
      </v-col>
      <v-col>
        New End Date would be:
        <br />
        {{ dateFormatter.dddotmmdotyyyy(newWouldBeStartDateForLaterDate) }}
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid>
    <v-col>
      <v-btn @click="goToEnquiryView()">Go To Enquiry View</v-btn>
    </v-col>
  </v-container>
  <v-container fluid class="bg-lightgray mt-2">
    <ProtelReservationsTable
      :reservations="itineraryReservationToBeEdited.protelReservations"
    ></ProtelReservationsTable>

    <v-row>
      <v-col class="pr-0 standard-card-column">
        <div class="standard-card">
          <v-divider class="standard-card-divider"></v-divider>
          <v-container fluid>
            <div class="d-flex justify-space-between">
              <template
                v-for="(reservationSelectable, index) of reservationSelectables"
                :key="reservationSelectable.reservation.id"
              >
                <ReservationSlice
                  :reservationSelectable="reservationSelectable"
                  @selectReservation="
                    (reservationSelectable) => selectReservation(reservationSelectable)
                  "
                ></ReservationSlice>
                <div
                  class="d-flex align-center justify-center"
                  v-if="index !== reservationSelectables.length - 1"
                >
                  <v-icon size="x-large">mdi-arrow-right</v-icon>
                </div>
              </template>
            </div>
          </v-container>
        </div></v-col
      >
    </v-row>
  </v-container>
  <v-container fluid class="bg-lightgray pt-0" v-if="selectedReservation">
    <ReservationCards v-model="selectedReservation.reservation"></ReservationCards>
  </v-container>
</template>
