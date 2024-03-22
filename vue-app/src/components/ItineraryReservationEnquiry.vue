<script setup lang="ts">
import { ref } from 'vue'
import ProfileService from '@/services/ProfileService'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const addReservationItems = [
  { title: 'New', icon: 'mdi-playlist-check' },
  { title: 'Existing', icon: 'mdi-playlist-plus' }
]

const profileService = new ProfileService(axios)
profileService.getProfile().then((profile) => {
  console.log(profile)
})

const arrivalDateString = getDateString(new Date())
const arrivalDate = ref(new Date())
const arrivalDateMenu = ref(false)
const departureDateString = getDateString(new Date())
const departureDate = ref(new Date())
const departureDateMenu = ref(false)

function getDateString(date: Date): string {
  const newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return newDate.toISOString().substring(0, 10)
}
</script>

<template>
  <v-toolbar
    class="bg-primary d-flex justify-space-between"
    :title="$t('general.itineraryReservationEnquiry')"
    app
  >
    <v-menu>
      <template v-slot:activator="{ props, isActive }">
        <v-btn class="bg-white" v-bind="props">
          {{ $t('general.addReservation') }}
          <v-icon v-if="isActive" icon="mdi-chevron-up"></v-icon>
          <v-icon v-if="!isActive" icon="mdi-chevron-down"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in addReservationItems" :key="index" :value="index">
          <v-list-item-title class="d-flex justify-space-between"
            >{{ item.title }} <v-icon :icon="item.icon"></v-icon
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <v-container fluid class="bg-white">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <v-select
          label=""
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-select>
        <v-icon>mdi-city</v-icon>
      </v-col>
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
            <v-card-title>Arrival Date</v-card-title>
            <v-date-picker v-model="arrivalDate"> </v-date-picker>
            <v-spacer></v-spacer>
            <div class="d-flex justify-end">
              <v-btn @click="arrivalDateMenu = false"> Cancel </v-btn>
              <v-btn
                @click="(arrivalDateString = getDateString(arrivalDate)), (arrivalDateMenu = false)"
              >
                OK
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field label="Nights" type="number"></v-text-field>
      </v-col>
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
              v-model="departureDate"
              @update:model-value="departureDateString = getDateString(departureDate)"
            ></v-date-picker>
            <v-spacer></v-spacer>
            <div class="d-flex justify-end">
              <v-btn @click="departureDateMenu = false"> Cancel </v-btn>
              <v-btn
                @click="
                  (arrivalDateString = getDateString(arrivalDate)), (departureDateMenu = false)
                "
              >
                OK
              </v-btn>
            </div>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field label="Rooms" type="number"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete label="Room Type" :items="['Standard | King']" multiple></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field label="Guests per room" type="number"></v-text-field>
      </v-col>
      <v-col>
        <v-autocomplete
          label="Guest"
          placeholder="Last Name | First Name"
          hint="Last Name | First Name"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex justify-space-between">
        <v-btn class="secondary-button mr-3">Reset</v-btn>
        <v-btn class="primary-button">Check</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container fluid class="bg-lightblue">
    <v-row>
      <v-col cols="4">
        <v-autocomplete
          label=""
          prepend-inner-icon="mdi-magnify"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row class="border-top">
      <v-col cols="2" class="d-flex justify-space-between">
        <v-icon class="text-primary">mdi-plus</v-icon>
        Availibility (incl. OB)
      </v-col>
      <v-col class="bg-lightgray d-flex">
        <div v-for="index in 12" :key="index" class="bg-white mr-3 px-5 py-2">
          <v-icon>mdi-circle-small</v-icon>
        </div>
      </v-col>
    </v-row>
    <v-row class="border-top-bottom">
      <v-col cols="2" class="d-flex justify-space-between"> </v-col>
      <v-col class="bg-lightgray d-flex">
        <div v-for="index in 12" :key="index" class="bg-white mr-3 px-5 py-2">
          <v-icon>mdi-circle-small</v-icon>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <div class="d-flex justify-end">
    <v-btn class="secondary-button">Cancel</v-btn>
    <v-btn class="ml-2 disabled-button">Book</v-btn>
  </div>
</template>
