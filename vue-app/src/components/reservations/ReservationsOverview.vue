<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import ReservationsTable from './ReservationsTable.vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { AxiosStatic } from 'axios'
import { ReservationService } from '@/services/ReservationService'
const axios: AxiosStatic | undefined = inject('axios')
const reservationService = new ReservationService(axios)
const reservations: Ref<IReservation[]> = ref([])
onMounted(() => {
  reservationService.getAll().then((data) => {
    reservations.value = data
  })
})
</script>

<template>
  <v-toolbar
    class="bg-primary text-white d-flex justify-space-between"
    :title="$t('reservation.plural')"
    app
  >
    <v-btn class="bg-white me-2">
      <v-icon icon="mdi-select-all"></v-icon>

      BULK
    </v-btn>
    <v-btn class="bg-white me-2">
      <v-icon icon="mdi-filter-variant"></v-icon>

      Filter
    </v-btn>
    <v-menu>
      <template v-slot:activator="{ props, isActive }">
        <v-btn class="bg-white" v-bind="props">
          <v-icon>mdi-printer-outline</v-icon>
          PRINT
          <v-icon v-if="isActive" icon="mdi-chevron-up"></v-icon>
          <v-icon v-if="!isActive" icon="mdi-chevron-down"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="d-flex justify-space-between">
            New <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled class="bg-lightgray">
          <v-list-item-title class="d-flex justify-space-between">
            Existing <v-icon>mdi-playlist-plus</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
      <v-col>
        <v-autocomplete
          label="Type"
          item-title="name"
          item-value="id"
          variant="underlined"
        ></v-autocomplete>
      </v-col>

      <v-col>
        <div>
          <v-checkbox label="Confidential Rate" :hide-details="true" density="compact"></v-checkbox>
          <v-checkbox label="Day Use" :hide-details="true" density="compact"></v-checkbox>
        </div>
      </v-col>
      <v-col class="d-flex justify-space-between">
        <v-btn class="primary-button mr-3 w-100">SEARCH</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="bg-white">
    <ReservationsTable :reservations="reservations" />
  </v-container>
</template>
