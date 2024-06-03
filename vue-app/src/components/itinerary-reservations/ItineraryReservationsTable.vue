<script setup lang="ts">
import router from '@/router'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ref } from 'vue'

const availableTableDataHeaders = ref([
  { key: 'id', title: 'ID', selected: true },
  { key: 'action', title: 'ACTION', selected: true }
])

defineProps({
  itineraryReservations: { type: Object as () => IItineraryReservation[], required: true }
})
const changeColumnsDialog = ref(false)

const isSpecialColumn = (header: string) => {
  return ['collapse', 'arrivalDate', 'departureDate', 'action', 'settings'].includes(header)
}

const editItineraryReservation = (itineraryReservation: IItineraryReservation) => {
  router.push('/itinerary-reservations/' + itineraryReservation.id)
}
</script>

<template>
  <v-data-table
    :headers="availableTableDataHeaders.filter((h) => h.selected)"
    :items="itineraryReservations"
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
              {{ row.item[header.key as keyof IItineraryReservation] }}
            </template>
          </div>
          <div v-if="!row.item.hasOwnProperty(header.key)">
            <template v-if="header.key === 'collapse'">
              <v-icon icon="mdi-chevron-down"></v-icon>
            </template>

            <template v-if="header.key === 'action'">
              <v-btn
                class="lightgray-button w-100"
                density="comfortable"
                variant="tonal"
                @click="editItineraryReservation(row.item)"
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
