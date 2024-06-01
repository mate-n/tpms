<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import ReservationsTable from './ReservationsTable.vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { AxiosStatic } from 'axios'
import { ReservationService } from '@/services/ReservationService'
import { ItineraryReservationService } from '@/services/reservations/ItineraryReservationService'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import ItineraryReservationShow from './ItineraryReservationShow.vue'
const axios: AxiosStatic | undefined = inject('axios')
const itineraryReservationService = new ItineraryReservationService(axios)
const itineraryReservations: Ref<IItineraryReservation[]> = ref([])
onMounted(() => {
  itineraryReservationService.getAll().then((data) => {
    itineraryReservations.value = data
  })
})
</script>

<template>
  <v-toolbar
    class="bg-primary text-white d-flex justify-space-between"
    :title="$t('itineraryReservation.plural')"
    app
  >
  </v-toolbar>
  <v-container fluid class="bg-lightgray">
    <v-row class="d-flex align-center">
      <v-col>
        <v-autocomplete
          label="Search"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-autocomplete>
      </v-col>
      <v-col>
        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              label="From"
              append-inner-icon="mdi-calendar"
              class="required-input"
              variant="underlined"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-card>
            <v-date-picker :hide-header="true"> </v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              label="To"
              append-inner-icon="mdi-calendar"
              variant="underlined"
              class="required-input"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-card>
            <v-date-picker :hide-header="true"></v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col class="d-flex justify-space-between">
        <v-btn class="primary-button mr-3 w-100">SEARCH</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="bg-white">
    <ItineraryReservationShow
      v-for="itineraryReservation in itineraryReservations"
      :itineraryReservation="itineraryReservation"
      :key="itineraryReservation.id"
    />
  </v-container>
</template>
