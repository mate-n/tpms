<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { PropertyService } from '@/services/PropertyService'
import { RoomService } from '@/services/RoomService'
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed, ref, type Ref } from 'vue'
import { onBeforeMount } from 'vue'
import ConservationFeesCard from './ConservationFeesCard.vue'
import type { IProperty } from '@/shared/interfaces/IProperty'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import TicketsCard from '../tickets/TicketsCard.vue'
const axios: AxiosStatic | undefined = inject('axios')
const basketItemsStore = useBasketItemsStore()
const reservationHelper = new ReservationHelper()
const props = defineProps({
  reservation: { type: Object as () => IReservation, required: true }
})
const property: Ref<IProperty | null> = ref(null)
const profile: Ref<IProfile | null> = ref(null)
const room: Ref<IRoom | null> = ref(null)
const propertyService = new PropertyService(axios)
const profileService = new ProfileService(axios)
const roomService = new RoomService(axios)
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()
onBeforeMount(() => {
  if (props.reservation.propertyID) {
    propertyService.get(props.reservation.propertyID).then((response) => {
      property.value = response
    })
  }

  if (props.reservation.roomID) {
    roomService.get(props.reservation.roomID).then((response) => {
      room.value = response
    })
  }

  if (props.reservation.profileID) {
    profileService.get(props.reservation.profileID).then((response) => {
      profile.value = response
    })
  }
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    props.reservation.arrivalDate,
    props.reservation.departureDate
  )
})

const removeReservation = (reservation: IReservation) => {
  basketItemsStore.removeReservation(reservation)
}

const conservationFeesDialog = ref(false)

const ticketsCardDialog = ref(false)

const showRemoveButton = computed(() => {
  return reservationHelper.isReservationFirstOrLastOfArray(
    props.reservation,
    basketItemsStore.reservations
  )
})
</script>

<template>
  <v-card class="mb-5">
    <v-card-text class="px-0">
      <div class="d-flex justify-space-between">
        <div class="ms-2 pb-3">
          <v-icon>mdi-chevron-double-right</v-icon><strong>{{ property?.name }}</strong>
        </div>
        <div>
          <v-icon
            class="text-gray me-2"
            v-if="showRemoveButton"
            @click="removeReservation(reservation)"
          >
            mdi-delete-outline
          </v-icon>
        </div>
      </div>
      <div class="bg-lightblue py-3">
        <div class="ms-2">
          <v-row>
            <v-col
              ><span class="standard-caption">Last Name</span><br />
              {{ profile?.lastName }}</v-col
            >
            <v-col>
              <span class="standard-caption">Arrival</span><br />
              {{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }}
            </v-col>
            <v-col><span class="standard-caption">Nights</span><br />{{ numberOfNights }}</v-col>
            <v-col
              ><span class="standard-caption">Guests per room</span><br />{{
                reservation.numberOfGuestsPerRoom
              }}
            </v-col>
            <v-col><span class="standard-caption">Email</span><br />{{ profile?.email }}</v-col>
          </v-row>
          <v-row>
            <v-col
              ><span class="standard-caption">First Name</span><br />{{ profile?.firstName }}</v-col
            >
            <v-col>
              <span class="standard-caption">Departure</span><br />
              {{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}
            </v-col>
            <v-col
              ><span class="standard-caption">Rooms</span><br />{{
                reservation.numberOfRooms
              }}</v-col
            >
            <v-col></v-col>
            <v-col><span class="standard-caption">Phone</span><br />{{ profile?.phone }}</v-col>
          </v-row>
        </div>
      </div>
      <div class="ms-2 py-3">
        <v-row>
          <v-col>
            TOTAL RATE<br />
            <strong>1.934,00</strong></v-col
          >
          <v-col>
            AVERAGE RATE<br />
            1.934,00</v-col
          >
          <v-col></v-col>
          <v-col></v-col>
          <v-col class="d-flex">
            <v-btn @click="conservationFeesDialog = true" class="me-2 mb-2"
              >Add Conservation Fees</v-btn
            >
            <v-btn @click="ticketsCardDialog = true" class="me-2">Add Fixed Charges</v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
  <v-dialog v-model="conservationFeesDialog" fullscreen scrollable>
    <v-card>
      <ConservationFeesCard @close="conservationFeesDialog = false" />
    </v-card>
  </v-dialog>

  <v-dialog v-model="ticketsCardDialog" fullscreen scrollable>
    <v-card>
      <TicketsCard :reservation="reservation" @close="ticketsCardDialog = false" />
    </v-card>
  </v-dialog>
</template>
