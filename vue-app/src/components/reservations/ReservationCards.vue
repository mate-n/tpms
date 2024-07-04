<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'
import ProfileSearchField from '@/components/profiles/ProfileSearchField.vue'
import StayDetailsForm from './StayDetailsForm.vue'
import RoomDetailsForm from './RoomDetailsForm.vue'
import RateDetailsForm from './RateDetailsForm.vue'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'

const reservationToBeEdited = defineModel({
  required: true,
  type: Object as () => IReservation
})
</script>

<template>
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <StayDetailsForm v-model="reservationToBeEdited"></StayDetailsForm>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <RoomDetailsForm v-model="reservationToBeEdited"></RoomDetailsForm>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <RateDetailsForm v-model="reservationToBeEdited"></RateDetailsForm>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Notes</span></v-toolbar-title>
            <v-btn class="text-gray" icon> <v-icon>mdi-calendar-text-outline</v-icon></v-btn>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="standard-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Linked Profiles</span></v-toolbar-title>
            <v-btn class="text-gray" icon> <v-icon>mdi-account-multiple-outline</v-icon></v-btn>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container>
            <ProfileSearchField
              label="Guest"
              :required="reservationToBeEdited.isBookerGuest"
              icon-name="mdi-account-circle-outline"
              :profile-look-up-post-body="new ProfileLookUpPostBody()"
              v-model="reservationToBeEdited.guestProfileID"
            ></ProfileSearchField>
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
          </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 standard-card-column">
        <div class="standard-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Billing</span></v-toolbar-title>
            <v-btn class="text-gray" icon> <v-icon>mdi-currency-usd</v-icon></v-btn>
          </v-toolbar>

          <v-divider class="profiles-card-divider"></v-divider>
          <v-container class="font-size-rem-10">
            <v-row class="text-gray">
              <v-col> PAYMENT:</v-col>
              <v-col class="d-flex justify-end">0.000 </v-col>
            </v-row>
            <v-row class="text-gray">
              <v-col> CHARGES:</v-col>
              <v-col class="d-flex justify-end">0.000 </v-col>
            </v-row>
            <v-row class="text-gray">
              <v-col> BALANCE:</v-col>
              <v-col class="d-flex justify-end">0.000 </v-col>
            </v-row>
            <v-divider class="my-2"></v-divider>
            <v-row class="">
              <v-col> FORECAST:</v-col>
              <v-col class="d-flex justify-end">166,866.750</v-col>
            </v-row>
            <v-row class="text-primary">
              <v-col> PRE AUTH. DUE:</v-col>
              <v-col class="d-flex justify-end">166,866.750</v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
