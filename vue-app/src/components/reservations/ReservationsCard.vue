<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { AxiosStatic } from 'axios'
import { type Ref, ref, onMounted, inject } from 'vue'
import ReservationFormCard from './ReservationFormCard.vue'
import { ReservationService } from '@/services/ReservationService'
const axios: AxiosStatic | undefined = inject('axios')
const reservationService = new ReservationService(axios)
const emits = defineEmits(['close'])
const newReservationFormCardDialog = ref(false)
const reservations: Ref<IReservation[]> = ref([])
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()

const availableTableDataHeaders = ref([
  { key: 'createdAt', title: 'GUEST NAME(S)', selected: true },
  { key: 'arrivalDate', title: 'ARRIVAL', selected: true },
  { key: 'departureDate', title: 'DEPARTURE', selected: true },
  { key: 'numberOfNights', title: 'NIGHTS', selected: true },
  { key: 'rt', title: 'RT', selected: true },
  { key: 'persons', title: 'PERSONS', selected: true },
  { key: 'resStatus', title: 'RES. STATUS', selected: true },
  { key: 'resStatus', title: 'RES. NO.', selected: true }
])

const changeColumnsDialog = ref(false)

const isSpecialColumn = (header: string) => {
  return ['arrivalDate', 'departureDate'].includes(header)
}

onMounted(() => {
  reservationService.getAll().then((data) => {
    reservations.value = data
  })
})
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Reservations</span></v-toolbar-title>
      <div class="standard-card-toolbar-button" @click="newReservationFormCardDialog = true">
        NEW RESERVATION
      </div>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray px-0 mx-0">
      <v-data-table
        :headers="availableTableDataHeaders.filter((h) => h.selected)"
        :items="reservations"
      >
        <template v-slot:[`header.avatar`]="{ column }">
          {{ column.title }}
          <v-icon>mdi-sort-variant </v-icon>
        </template>
        <template v-slot:[`header.menu`]="{ column }">
          {{ column.title }}
          <v-btn icon variant="text">
            <v-icon @click="changeColumnsDialog = true">mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <template v-slot:item="row">
          <tr>
            <td
              v-for="header in availableTableDataHeaders.filter((h) => h.selected)"
              :key="header.key"
            >
              <div v-if="row.item.hasOwnProperty(header.key)">
                <template v-if="!isSpecialColumn(header.key)">
                  {{ row.item[header.key as keyof IReservation] }}
                </template>

                <template v-if="header.key === 'arrivalDate'">
                  {{ dateFormatter.dddotmmdotyyyy(row.item['arrivalDate']) }}
                </template>

                <template v-if="header.key === 'departureDate'">
                  {{ dateFormatter.dddotmmdotyyyy(row.item['departureDate']) }}
                </template>
              </div>
              <div v-if="!row.item.hasOwnProperty(header.key)">
                <template v-if="header.key === 'numberOfNights'">
                  {{
                    dateHelper.calculateNightsBetweenDates(
                      row.item['arrivalDate'],
                      row.item['departureDate']
                    )
                  }}
                </template>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
  <v-dialog v-model="newReservationFormCardDialog" scrollable auto>
    <v-card>
      <ReservationFormCard @close="newReservationFormCardDialog = false" />
    </v-card>
  </v-dialog>
</template>
@/services/ReservationService
