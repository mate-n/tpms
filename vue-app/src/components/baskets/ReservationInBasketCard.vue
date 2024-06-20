<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { PropertyService } from '@/services/PropertyService'
import { RoomService } from '@/services/RoomService'
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
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
import { TicketService } from '@/services/TicketService'
import TicketsTable from '../tickets/TicketsTable.vue'
import type { ITicket } from '@/shared/interfaces/ITicket'
import { GuestsPerRoomHelper } from '@/helpers/GuestsPerRoomHelper'
import ProfileSearchCard from '../profiles/ProfileSearchCard.vue'
import { ProfileHelper } from '@/helpers/ProfileHelper'
const profileHelper = new ProfileHelper()
const ticketsService = new TicketService()
const axios: AxiosStatic | undefined = inject('axios')
const basketItemsStore = useBasketItemsStore()
const reservationHelper = new ReservationHelper()
const reservation = defineModel({ required: true, type: Object as () => IReservation })
const property: Ref<IProperty | null> = ref(null)
const profile: Ref<IProfile | null> = ref(null)
const room: Ref<IRoom | null> = ref(null)
const propertyService = new PropertyService(axios)
const profileService = new ProfileService(axios)
const roomService = new RoomService(axios)
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()
const guestsPerRoomHelper = new GuestsPerRoomHelper()
const profileDialog = ref(false)

onBeforeMount(() => {
  if (reservation.value.propertyID) {
    propertyService.get(reservation.value.propertyID).then((response) => {
      property.value = response
    })
  }

  if (reservation.value.roomID) {
    roomService.get(reservation.value.roomID).then((response) => {
      room.value = response
    })
  }

  if (reservation.value.profileID) {
    profileService.get(reservation.value.profileID).then((response) => {
      profile.value = response
    })
  }
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservation.value.arrivalDate,
    reservation.value.departureDate
  )
})

const removeReservation = (reservation: IReservation) => {
  basketItemsStore.removeReservation(reservation)
}

const conservationFeesDialog = ref(false)

const ticketsCardDialog = ref(false)

const showRemoveButton = computed(() => {
  return reservationHelper.isReservationFirstOrLastOfArray(
    reservation.value,
    basketItemsStore.reservations
  )
})

const clickOnAddFixedCharges = () => {
  ticketsCardDialog.value = true
}

const addTicketsToReservation = () => {
  ticketsCardDialog.value = false
}

const availableTickets: Ref<ITicket[]> = ref([])

const chargesLabel = computed(() => {
  return reservation.value.ticketIDs.length > 0 ? 'Charges' : 'No Charges'
})

onMounted(() => {
  ticketsService.getAll().then((data) => {
    availableTickets.value = data
    for (const ticket of availableTickets.value) {
      ticket.Date = new Date()
    }
  })
})
const profilesInDropdown: Ref<IProfile[]> = ref([])
onBeforeMount(() => {
  profileService.findAll().then((response: IProfile[]) => {
    profilesInDropdown.value = response
  })
})

const profileSelected = (selectedProfile: IProfile) => {
  changeProfileOfReservations(selectedProfile)
  profileDialog.value = false
}

const emitChange = () => {
  if (reservation.value.profileID) {
    profileService.get(reservation.value.profileID).then((response) => {
      changeProfileOfReservations(response)
    })
  }
}
const changeProfileOfReservations = (newProfile: IProfile) => {
  profile.value = newProfile
  profileHelper.changeProfile(reservation.value, newProfile)
  basketItemsStore.reservations.forEach((reservation) => {
    profileHelper.changeProfile(reservation, newProfile)
  })
}

watch(
  () => reservation.value.profileID,
  (newValue) => {
    if (newValue) {
      profileService.get(newValue).then((response) => {
        profile.value = response
      })
    }
  }
)
</script>

<template>
  <v-card class="mb-5">
    <v-card-text class="px-0">
      <div class="d-flex justify-space-between align-center">
        <div class="ms-2 pb-3">
          <v-icon>mdi-chevron-double-right</v-icon><strong>{{ reservation.propertyName }}</strong>
        </div>
        <div class="d-flex align-center" style="min-width: 50%">
          <v-autocomplete
            label="Guest"
            placeholder="Last Name | First Name"
            hint="Last Name | First Name"
            v-model="reservation.profileID"
            :items="profilesInDropdown"
            :item-title="(profile) => `${profile.lastName}, ${profile.firstName}`"
            :item-value="(profile) => profile.id"
            @update:model-value="emitChange()"
          ></v-autocomplete>
          <div class="d-flex align-center" @click="profileDialog = true">
            <v-icon>mdi-magnify</v-icon>
          </div>
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
                guestsPerRoomHelper.getTotalNumberOfGuests(reservation.guestsPerRoom)
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
          <v-row>
            <v-col>
              TOTAL RATE<br />
              <strong>{{
                reservationHelper.calculateTotalRate(reservation).toFixed(2)
              }}</strong></v-col
            >
            <v-col>
              AVERAGE RATE<br />
              {{
                reservationHelper.getAverageRoomRate(
                  reservation.selectedProtelAvailabilityGroups.map((s) => s.availabilities).flat()
                )
              }}
            </v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col class="d-flex"> </v-col>
          </v-row>
        </div>
      </div>
      <div class="ms-2 py-3">
        <div class="pb-3">
          <strong>{{ chargesLabel }}</strong>
        </div>
        <v-row>
          <v-col>
            <TicketsTable
              :tickets="reservation.tickets"
              :collapsible="true"
              :collapsed="true"
              :show-date="true"
              v-if="reservation.ticketIDs.length > 0"
            />
          </v-col>
          <v-col class="d-flex align-end justify-end">
            <v-btn @click="clickOnAddFixedCharges()" class="me-2"> Add Additional </v-btn></v-col
          >
        </v-row>
      </div>
      <div class="ps-2 ma-0 py-3 bg-lightblue">
        <v-row>
          <v-col>
            TOTAL<br />
            <strong>
              {{ reservationHelper.calculateTotalReservationPrice(reservation).toFixed(2) }}
            </strong></v-col
          >
          <v-col> </v-col>
          <v-col></v-col>
          <v-col></v-col>
          <v-col class="d-flex"> </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
  <v-dialog v-model="conservationFeesDialog" fullscreen scrollable>
    <v-card>
      <ConservationFeesCard v-model="reservation" @close="conservationFeesDialog = false" />
    </v-card>
  </v-dialog>

  <v-dialog v-model="ticketsCardDialog" fullscreen scrollable>
    <v-card>
      <TicketsCard
        v-model="reservation"
        @close="ticketsCardDialog = false"
        @add-tickets-to-reservation="addTicketsToReservation()"
      />
    </v-card>
  </v-dialog>

  <v-dialog v-model="profileDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearchCard
        @close="profileDialog = false"
        @profile-selected="(profile) => profileSelected(profile)"
      ></ProfileSearchCard>
    </v-card>
  </v-dialog>
</template>
