<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'
import DateSelecter from '../dates/DateSelecter.vue'
import { DateHelper } from '@/helpers/DateHelper'
import { computed, ref } from 'vue'
import TimeSelecter from '../times/TimeSelecter.vue'
import PolicyInfoCard from './PolicyInfoCard.vue'
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })

const dateHelper = new DateHelper()

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservationToBeEdited.value.arrivalDate,
    reservationToBeEdited.value.departureDate
  )
})

const policyInfoDialog = ref(false)
</script>
<template>
  <div class="standard-card">
    <v-toolbar class="standard-card-toolbar">
      <v-toolbar-title><span class="text-primary">Stay Details</span></v-toolbar-title>
    </v-toolbar>
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
        <v-col>
          <v-text-field
            label="Nights"
            v-model="numberOfNights"
            :error-messages="
              reservationToBeEdited.errors && reservationToBeEdited.errors['numberOfNights']
            "
            variant="underlined"
            type="number"
          ></v-text-field
        ></v-col>
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
      <v-row>
        <v-col>
          <DateSelecter
            v-model="reservationToBeEdited.departureDate"
            label="Departure"
          ></DateSelecter>
        </v-col>
        <v-col class="d-flex">
          <v-text-field label="GTD / CXL" variant="underlined"></v-text-field>
          <div class="d-flex align-center">
            <v-icon @click="policyInfoDialog = true">mdi-alert-circle-outline</v-icon>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex">
            <v-row>
              <v-col>
                <TimeSelecter
                  v-model="reservationToBeEdited.arrivalDate"
                  label="ETA"
                ></TimeSelecter>
              </v-col>
              <v-col>
                <TimeSelecter
                  v-model="reservationToBeEdited.departureDate"
                  label="ETD"
                ></TimeSelecter>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <v-select
            label="Payment Type"
            variant="underlined"
            :items="['Credit Card', 'Cash', 'Noncash', 'Debitor']"
            class="me-3 required-input"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <v-dialog v-model="policyInfoDialog" width="30rem" height="30rem" scrollable>
    <v-card>
      <PolicyInfoCard
        v-model="reservationToBeEdited"
        @close="policyInfoDialog = false"
      ></PolicyInfoCard>
    </v-card>
  </v-dialog>
</template>
