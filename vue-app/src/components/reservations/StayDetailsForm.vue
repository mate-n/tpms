<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'
import DateSelecter from '../dates/DateSelecter.vue'
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })
</script>
<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Stay Details</span></v-toolbar-title>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <v-row>
        <v-col>
          <DateSelecter v-model="reservationToBeEdited.arrivalDate" label="Arrival"></DateSelecter>
        </v-col>
        <v-col>
          <DateSelecter v-model="reservationToBeEdited.arrivalDate" label="Optional"></DateSelecter>
        </v-col>
      </v-row>
      <v-row>
        <v-col> </v-col>
        <v-col>
          <v-text-field
            label="Guests per room"
            v-model="reservationToBeEdited.numberOfGuestsPerRoom"
            :error-messages="
              reservationToBeEdited.errors && reservationToBeEdited.errors['numberOfGuestsPerRoom']
            "
            variant="underlined"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
