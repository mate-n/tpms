<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import router from '@/router'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { ref } from 'vue'
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()
const availableTableDataHeaders = ref([
  { key: 'collapse', title: '', selected: true },
  { key: 'guestName', title: 'GUEST NAME(S)', selected: true },
  { key: 'arrivalDate', title: 'ARRIVAL', selected: true },
  { key: 'departureDate', title: 'DEPARTURE', selected: true },
  { key: 'numberOfNights', title: 'NIGHTS', selected: true },
  { key: 'roomID', title: 'ROOM', selected: true },
  { key: 'propertyName', title: 'PROPERTY', selected: true },
  { key: 'action', title: 'ACTION', selected: true },
  { key: 'menu', title: '', selected: true }
])

defineProps({
  reservations: { type: Object as () => IReservation[], required: true }
})
const changeColumnsDialog = ref(false)

const isSpecialColumn = (header: string) => {
  return ['collapse', 'arrivalDate', 'departureDate', 'action', 'settings'].includes(header)
}

const editReservation = (reservation: IReservation) => {
  router.push('/reservations/' + reservation.id)
}
</script>

<template>
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
        <td v-for="header in availableTableDataHeaders.filter((h) => h.selected)" :key="header.key">
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

            <template v-if="header.key === 'collapse'">
              <v-icon icon="mdi-chevron-down"></v-icon>
            </template>

            <template v-if="header.key === 'action'">
              <v-btn
                class="lightgray-button w-100"
                density="comfortable"
                variant="tonal"
                @click="editReservation(row.item)"
                >Edit</v-btn
              >
            </template>

            <template v-if="header.key === 'menu'">
              <v-btn icon variant="text">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
