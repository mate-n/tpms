<script setup lang="ts">
import { DateHelper } from '@/helpers/DateHelper'
import { RoomService } from '@/services/RoomService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { AxiosStatic } from 'axios'
import { ref, computed, type Ref, onMounted, inject } from 'vue'
import ProfileSearchField from '@/components/profiles/ProfileSearchField.vue'

const axios: AxiosStatic | undefined = inject('axios')
const roomService = new RoomService(axios)
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })
const roomsInDropdown: Ref<IRoom[]> = ref([])

const dateHelper = new DateHelper()

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

onMounted(() => {
  roomService.getAll().then((response) => {
    roomsInDropdown.value = response
  })
})
</script>

<template>
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Stay Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container>
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
                <v-menu v-model="arrivalDateMenu" :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      label="Optional Date"
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
            </v-row>
            <v-row>
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
                  label="Guests per room"
                  v-model="reservationToBeEdited.numberOfGuestsPerRoom"
                  :error-messages="
                    reservationToBeEdited.errors &&
                    reservationToBeEdited.errors['numberOfGuestsPerRoom']
                  "
                  variant="underlined"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Room Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container>
            <v-autocomplete
              label="Room Type"
              v-model="reservationToBeEdited.roomID"
              :items="roomsInDropdown"
              variant="underlined"
              item-title="name"
              item-value="id"
            ></v-autocomplete>

            <v-autocomplete
              label="Room To Change"
              v-model="reservationToBeEdited.roomID"
              :items="roomsInDropdown"
              variant="underlined"
              item-title="name"
              item-value="id"
            ></v-autocomplete>
          </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Rate Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Segmentation</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Linked Profiles</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container>
            <ProfileSearchField
              label="Guest"
              :required="reservationToBeEdited.isBookerGuest"
              icon-name="mdi-account-circle-outline"
              :profile-search-input="{
                guestTypeID: 1
              }"
              v-model="reservationToBeEdited.guestProfileID"
            ></ProfileSearchField>
            <div class="" v-if="!reservationToBeEdited.isBookerGuest">
              <ProfileSearchField
                label="Booker"
                :required="!reservationToBeEdited.isBookerGuest"
                icon-name="mdi-account-tie-voice-outline"
                :profile-search-input="{
                  guestTypeID: 1
                }"
                v-model="reservationToBeEdited.bookerProfileID"
              ></ProfileSearchField>
            </div>
            <ProfileSearchField
              label="Company"
              icon-name="mdi-briefcase-variant-outline"
              :profile-search-input="{
                guestTypeID: 2
              }"
              v-model="reservationToBeEdited.companyProfileID"
            ></ProfileSearchField>
            <ProfileSearchField
              label="Source"
              icon-name="mdi-earth"
              :profile-search-input="{
                guestTypeID: 5
              }"
              v-model="reservationToBeEdited.sourceProfileID"
            ></ProfileSearchField>
            <ProfileSearchField
              label="Travel Agent"
              icon-name="mdi-airplane"
              :profile-search-input="{
                guestTypeID: 4
              }"
              v-model="reservationToBeEdited.travelAgentProfileID"
            ></ProfileSearchField>
          </v-container>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Traces</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Notes</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">User Defined</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Attachments</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Billing</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
