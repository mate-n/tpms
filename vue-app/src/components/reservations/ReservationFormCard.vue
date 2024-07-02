<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'
import { DateHelper } from '@/helpers/DateHelper'
import ProfileSearchField from '../profiles/ProfileSearchField.vue'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import { DateFormatter } from '@/helpers/DateFormatter'
import { RoomService } from '@/services/RoomService'
import type { IRate } from '@/shared/interfaces/IRate'
import { RateService } from '@/services/RateService'
import GuestsPerRoomSelecter from '../selecters/GuestsPerRoomSelecter.vue'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const roomService = new RoomService(axios)
const rateService = new RateService(axios)
const reservationToBeEdited: Ref<IReservation> = ref(new Reservation())
const emits = defineEmits(['close', 'reservationAdded'])
const dateHelper = new DateHelper()
const roomsInDropdown: Ref<IRoom[]> = ref([])
const dateFormatter = new DateFormatter()

onMounted(() => {})
const arrivalDateMenu = ref(false)
const departureDateMenu = ref(false)

const arrivalDateString = computed(() => {
  return dateHelper.getDateString(reservationToBeEdited.value.arrivalDate)
})

const departureDateString = computed(() => {
  return dateHelper.getDateString(reservationToBeEdited.value.departureDate)
})
const arrivalDateMin = computed(() => {
  return dateHelper.getDateString(new Date())
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservationToBeEdited.value.arrivalDate,
    reservationToBeEdited.value.departureDate
  )
})

const departureDateMin = computed(() => {
  return dateHelper.getDateString(reservationToBeEdited.value.arrivalDate)
})

const guestProfile: Ref<IProfile | undefined> = ref(undefined)
const getProfileByID = (profileID: number) => {
  profileService.get(profileID).then((response) => {
    guestProfile.value = response
  })
}

const room: Ref<IRoom | undefined> = ref(undefined)
const getRoomByID = (roomID: number) => {
  roomService.get(roomID).then((response) => {
    room.value = response
  })
}

const availableRates = ref<IRate[]>([])

onMounted(() => {
  roomService.getAll().then((response) => {
    roomsInDropdown.value = response
  })

  rateService.getAvailableRates().then((response) => {
    availableRates.value = response
  })
})

watch(
  [() => reservationToBeEdited.value.guestProfileID, () => reservationToBeEdited.value.roomID],
  () => {
    if (reservationToBeEdited.value.guestProfileID) {
      getProfileByID(reservationToBeEdited.value.guestProfileID)
    } else {
      guestProfile.value = undefined
    }

    if (reservationToBeEdited.value.roomID) {
      getRoomByID(reservationToBeEdited.value.roomID)
    } else {
      room.value = undefined
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">New Reservation</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <v-row>
        <v-col cols="3">
          <v-card class="pa-3 elevation-0"
            ><h3>Stay Details</h3>
            <v-autocomplete
              label="Hotel"
              item-title="value"
              variant="underlined"
              class="me-3 required-input"
            ></v-autocomplete>
            <v-row>
              <v-col>
                <v-menu v-model="arrivalDateMenu" :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="arrivalDateString"
                      label="Arrival"
                      append-inner-icon="mdi-calendar"
                      variant="underlined"
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-card>
                    <v-date-picker
                      :hide-header="true"
                      v-model="reservationToBeEdited.arrivalDate"
                      :min="arrivalDateMin"
                    >
                    </v-date-picker>
                  </v-card>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  label="Nights"
                  :model-value="numberOfNights"
                  variant="underlined"
                  type="number"
                  :error-messages="
                    reservationToBeEdited.errors && reservationToBeEdited.errors['nights']
                  "
                  :readonly="true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-menu v-model="departureDateMenu" :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="departureDateString"
                      label="Departure"
                      append-inner-icon="mdi-calendar"
                      variant="underlined"
                      v-bind="props"
                    ></v-text-field>
                  </template>
                  <v-card>
                    <v-date-picker
                      :hide-header="true"
                      v-model="reservationToBeEdited.departureDate"
                      :min="departureDateMin"
                    ></v-date-picker>
                  </v-card>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field
                  label="Rooms"
                  v-model="reservationToBeEdited.numberOfRooms"
                  :error-messages="
                    reservationToBeEdited.errors && reservationToBeEdited.errors['numberOfRooms']
                  "
                  type="number"
                  variant="underlined"
                ></v-text-field
              ></v-col>
            </v-row>
            <GuestsPerRoomSelecter
              v-model="reservationToBeEdited.guestsPerRoom"
            ></GuestsPerRoomSelecter>
          </v-card>
          <v-card class="pa-3 mt-3 elevation-0"
            ><h3>Associated Profiles</h3>
            <ProfileSearchField
              label="Guest"
              :required="reservationToBeEdited.isBookerGuest"
              icon-name="mdi-account-circle-outline"
              :profile-look-up-post-body="new ProfileLookUpPostBody()"
              v-model="reservationToBeEdited.guestProfileID"
            ></ProfileSearchField>
            <v-checkbox
              v-model="reservationToBeEdited.isBookerGuest"
              label="Booker is the guest"
            ></v-checkbox>
            <div class="" v-if="!reservationToBeEdited.isBookerGuest">
              <ProfileSearchField
                label="Booker"
                :required="!reservationToBeEdited.isBookerGuest"
                icon-name="mdi-account-tie-voice-outline"
                :profile-look-up-post-body="new ProfileLookUpPostBody()"
                v-model="reservationToBeEdited.bookerProfileID"
              ></ProfileSearchField>
            </div>
            <ProfileSearchField
              label="Company"
              icon-name="mdi-briefcase-variant-outline"
              :profile-look-up-post-body="new ProfileLookUpPostBody()"
              v-model="reservationToBeEdited.companyProfileID"
            ></ProfileSearchField>
            <ProfileSearchField
              label="Source"
              icon-name="mdi-earth"
              :profile-look-up-post-body="new ProfileLookUpPostBody()"
              v-model="reservationToBeEdited.sourceProfileID"
            ></ProfileSearchField>
            <ProfileSearchField
              label="Travel Agent"
              icon-name="mdi-airplane"
              :profile-look-up-post-body="new ProfileLookUpPostBody()"
              v-model="reservationToBeEdited.travelAgentProfileID"
            ></ProfileSearchField>
          </v-card>
          <v-card class="pa-3 mt-3 elevation-0"
            ><h3>Room & Rate Details</h3>
            <v-autocomplete
              label="Enquiry Group"
              :items="['General', 'Contracted', 'Other']"
              variant="underlined"
              class="me-3 required-input"
            ></v-autocomplete>
            <v-autocomplete
              label="Room Type"
              v-model="reservationToBeEdited.roomID"
              :items="roomsInDropdown"
              variant="underlined"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
            <v-autocomplete
              label="Room Type Groups"
              :items="['STD']"
              variant="underlined"
              class="me-3 required-input"
              :multiple="true"
            ></v-autocomplete>
            <v-autocomplete
              label="Rate Code"
              variant="underlined"
              :items="availableRates"
              item-title="value"
              :multiple="true"
            ></v-autocomplete>
            <v-checkbox :hide-details="true" density="compact" label="Closed Rates"></v-checkbox>
            <v-checkbox
              :hide-details="true"
              density="compact"
              class="mt-0"
              label="Ignore Rate Strategies"
            ></v-checkbox>
            <v-checkbox :hide-details="true" density="compact" label="Day Use"></v-checkbox>
            <v-checkbox
              :hide-details="true"
              density="compact"
              label="Group Reservation"
            ></v-checkbox>
            <v-checkbox :hide-details="true" density="compact" label="Pseudo Rooms"></v-checkbox>
            <v-checkbox
              :hide-details="true"
              density="compact"
              label="Room Type Reservation"
            ></v-checkbox>
          </v-card>

          <div class="d-flex justify-end mt-3">
            <v-btn class="ml-2 secondary-button" @click="reservationToBeEdited.reset()"
              >RESET</v-btn
            >
            <v-btn class="ml-2 primary-button">CHECK</v-btn>
          </div>
        </v-col>
        <v-col>
          <v-card class="pa-3 mt-3 elevation-0"
            ><h3>Availability</h3>
            <v-table>
              <tbody>
                <tr>
                  <td></td>
                  <td>RATE DESCRIPTION</td>
                  <td>STD | KG</td>
                </tr>
                <tr>
                  <td>Availability (incl. OB) (8)</td>
                  <td>-</td>
                  <td>8</td>
                </tr>
                <tr>
                  <td>Rack BB</td>
                  <td>Rack rate | Room and Breakfast</td>
                  <td>28,800.000</td>
                </tr>
                <tr>
                  <td>STO 10%</td>
                  <td>STO 10%</td>
                  <td>25,920.000</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
          <v-card class="pa-3 mt-3 elevation-0"
            ><h3>Summary</h3>
            <div class="d-flex flex-wrap">
              <div class="reservation-summary-element">
                <span class="standard-caption">Hotel</span> <br />
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Last Name</span> <br />
                {{ guestProfile?.surname }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">First Name</span> <br />
                {{ guestProfile?.surname }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Email</span> <br />
                {{ guestProfile?.email }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Phone</span> <br />
                {{ guestProfile?.telephone }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">City</span> <br />
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Arrival</span> <br />
                {{ dateFormatter.dddotmmdotyyyy(reservationToBeEdited.arrivalDate) }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Departure</span> <br />
                {{ dateFormatter.dddotmmdotyyyy(reservationToBeEdited.departureDate) }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Nights</span> <br />
                {{ numberOfNights }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Adults</span> <br />
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Children</span> <br />
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Rooms</span> <br />
                {{ reservationToBeEdited.numberOfRooms }}
              </div>
              <div class="reservation-summary-element">
                <span class="standard-caption">Room Type</span> <br />
                {{ reservationToBeEdited.roomID }}
              </div>
            </div>
          </v-card>
          <div class="d-flex justify-end mt-3">
            <v-btn class="secondary-button me-2">CANCEL</v-btn>
            <v-btn class="secondary-button me-2">ADD TO CART</v-btn>
            <v-btn class="primary-button">BOOK</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
