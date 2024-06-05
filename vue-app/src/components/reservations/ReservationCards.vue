<script setup lang="ts">
import { RoomService } from '@/services/RoomService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { AxiosStatic } from 'axios'
import { ref, type Ref, onMounted, inject } from 'vue'
import ProfileSearchField from '@/components/profiles/ProfileSearchField.vue'
import StayDetailsForm from './StayDetailsForm.vue'

const axios: AxiosStatic | undefined = inject('axios')
const roomService = new RoomService(axios)
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })
const roomsInDropdown: Ref<IRoom[]> = ref([])

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
        <StayDetailsForm v-model="reservationToBeEdited"></StayDetailsForm>
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
    </v-row>
    <v-row>
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
      <v-col class="pr-0 profiles-card-column"> </v-col>
    </v-row>
  </v-container>
</template>
