<script setup lang="ts">
import ConservationFeeCard from './ConservationFeeCard.vue'
import { useFullscreen } from '@/composables/Fullscreen'
import { TicketService } from '@/services/TicketService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { ITicket } from '@/shared/interfaces/ITicket'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import TicketsCard from '../tickets/TicketsCard.vue'
const ticketsService = new TicketService()
const availableTickets: Ref<ITicket[]> = ref([])
const getTicketByTicketId = (ticketId: number) => {
  return availableTickets.value.find((t) => t.TicketId === ticketId)
}

const getTicketsByTicketIDs = (ticketIDs: number[]) => {
  return ticketIDs.map((ticketID) => getTicketByTicketId(ticketID))
}

const reservation = defineModel({ required: true, type: Object as () => IReservation })

const emits = defineEmits(['close'])

const { isFullScreen, toggleFullScreen } = useFullscreen()
const newConservationFeeDialog = ref(false)

onMounted(() => {
  ticketsService.getAll().then((data) => {
    availableTickets.value = data
  })
})

const availableTableDataHeaders = ref([
  { key: 'Name', title: 'Name', selected: true },
  { key: 'Price', title: 'Price', selected: true },
  { key: 'Description', title: 'Description', selected: true },
  { key: 'TicketEventName', title: 'TicketEventName', selected: true }
])

const ticketsCardDialog = ref(false)
</script>
<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Conservation Fees</span></v-toolbar-title>
      <div class="profiles-card-toolbar-button" @click="ticketsCardDialog = true">Add</div>
      <div class="profiles-card-toolbar-button" @click="toggleFullScreen()">
        <template v-if="isFullScreen">
          <v-icon size="large">mdi-fullscreen-exit</v-icon>
        </template>
        <template v-if="!isFullScreen">
          <v-icon size="large">mdi-fullscreen</v-icon>
        </template>
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <v-card>
        <v-data-table
          :items="getTicketsByTicketIDs(reservation.ticketIDs)"
          :headers="availableTableDataHeaders.filter((h) => h.selected)"
        ></v-data-table>
      </v-card>
    </v-container>
  </div>
  <v-dialog v-model="newConservationFeeDialog" scrollable>
    <v-card>
      <ConservationFeeCard @close="newConservationFeeDialog = false" />
    </v-card>
  </v-dialog>
  <v-dialog v-model="ticketsCardDialog" fullscreen scrollable>
    <v-card>
      <TicketsCard
        v-model="reservation"
        @close="ticketsCardDialog = false"
        @add-tickets-to-reservation="ticketsCardDialog = false"
      />
    </v-card>
  </v-dialog>
</template>
