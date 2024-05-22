<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { TicketService } from '@/services/TicketService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { ITicket } from '@/shared/interfaces/ITicket'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
const ticketsService = new TicketService()
const emits = defineEmits(['close'])
const dateFormatter = new DateFormatter()
const props = defineProps<{
  reservation: IReservation
}>()

const tickets: Ref<ITicket[]> = ref([])

onMounted(() => {
  ticketsService.getAll().then((data) => {
    tickets.value = data
  })
})
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Tickets</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray px-0 mx-0">
      <v-card class="pa-3">
        <v-row>
          <v-col><h3>Select Date</h3></v-col>
          <v-col
            ><h3>Choose Tickets</h3>
            <div v-for="ticket of tickets">
              <div v-if="ticket.AvailableTickets > 0">
                {{ ticket.Name }}
              </div>
            </div>
          </v-col>
          <v-col><h3>Confirm</h3></v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
