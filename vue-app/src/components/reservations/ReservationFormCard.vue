<script setup lang="ts">
import { computed, onMounted, ref, type Ref } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'
import { DateHelper } from '@/helpers/DateHelper'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'
import ProfileSearch from '../profiles/ProfileSearch.vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const reservationToBeEdited: Ref<IReservation> = ref(new Reservation())
const emits = defineEmits(['close', 'reservationAdded'])
const dateHelper = new DateHelper()

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

const profileSearchDialog = ref(false)
const guestSearchLoading = ref(false)
const guestSearchResults: Ref<IProfile[]> = ref([])

const bookerSearchDialog = ref(false)
const bookerSearchLoading = ref(false)
const bookerSearchResults: Ref<IProfile[]> = ref([])

const profileSearchUpdate = (input: any) => {
  const profileSearch: IProfileSearch = {
    name: input
  }

  profileService.search(profileSearch).then((response) => {
    guestSearchResults.value = response
  })
}

const profileSearchInput: IProfileSearch = {
  guestTypeID: 1
}

const profileSelectedInProfileSearch = (profile: IProfile) => {
  reservationToBeEdited.value.profileID = profile.id
  profileSearchDialog.value = false
}

onMounted(() => {
  profileService.search(profileSearchInput).then((response) => {
    guestSearchResults.value = response
  })
})
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
      <v-card class="pa-3"
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
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              label="Guests per room"
              v-model="reservationToBeEdited.numberOfGuestsPerRoom"
              :error-messages="
                reservationToBeEdited.errors &&
                reservationToBeEdited.errors['numberOfGuestsPerRoom']
              "
              type="number"
            ></v-text-field>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-card>
      <v-card class="pa-3"
        ><h3>Associated Profiles</h3>
        <div class="d-flex">
          <v-autocomplete
            :loading="guestSearchLoading"
            label="Guest"
            class="required-input"
            variant="underlined"
            v-model="reservationToBeEdited.profileID"
            :items="guestSearchResults"
            @update:search="profileSearchUpdate"
            item-title="name"
            item-value="id"
          ></v-autocomplete>
          <div class="d-flex align-center" @click="profileSearchDialog = true">
            <v-icon>mdi-magnify</v-icon>
          </div>
        </div>
        <v-checkbox
          v-model="reservationToBeEdited.isBookerGuest"
          label="Booker is the guest"
        ></v-checkbox>
        <div class="d-flex">
          <v-autocomplete
            :loading="bookerSearchLoading"
            label="Booker"
            class="required-input"
            variant="underlined"
            v-model="reservationToBeEdited.profileID"
            :items="bookerSearchResults"
            @update:search="profileSearchUpdate"
            item-title="name"
            item-value="id"
          ></v-autocomplete>
          <div class="d-flex align-center" @click="profileSearchDialog = true">
            <v-icon>mdi-magnify</v-icon>
          </div>
        </div>
      </v-card>
      <div class="d-flex justify-end mt-3">
        <v-btn class="secondary-button">ADD TO CART</v-btn>
        <v-btn class="ml-2 primary-button">BOOK</v-btn>
      </div>
    </v-container>
  </div>

  <v-dialog v-model="profileSearchDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearch
        :profile-search-input="profileSearchInput"
        @close="profileSearchDialog = false"
        @profile-selected="(profile) => profileSelectedInProfileSearch(profile)"
      ></ProfileSearch>
    </v-card>
  </v-dialog>
</template>
