<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { TicketService } from '@/services/TicketService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { ITicket } from '@/shared/interfaces/ITicket'
import type { ITicketOrder } from '@/shared/interfaces/ITicketOrder'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
const dateHelper = new DateHelper()
const ticketsService = new TicketService()
const emits = defineEmits(['close'])
const dateFormatter = new DateFormatter()
const props = defineProps<{
  reservation: IReservation
}>()

const selectedDate: Ref<Date | undefined> = ref(undefined)

const availableDates: Ref<Date[]> = ref([
  new Date(),
  dateHelper.addDays(new Date(), 1),
  dateHelper.addDays(new Date(), 2)
])

const tickets: Ref<ITicket[]> = ref([])

const selectedTickets: Ref<ITicketOrder[]> = ref([])

onMounted(() => {
  ticketsService.getAll().then((data) => {
    tickets.value = data
  })
})

const selectDate = (date: Date) => {
  selectedDate.value = date
}

const addTicket = (ticket: ITicket) => {
  const existingTicket = selectedTickets.value.find((t) => t.TicketId === ticket.TicketId)
  if (existingTicket) {
    existingTicket.NumberOfTickets++
    return
  } else {
    const ticketOrder: ITicketOrder = {
      TicketId: ticket.TicketId,
      TicketName: ticket.Name,
      NumberOfTickets: 1
    }
    selectedTickets.value.push(ticketOrder)
  }
}

const removeTicket = (ticket: ITicketOrder) => {
  const existingTicket = selectedTickets.value.find((t) => t.TicketId === ticket.TicketId)
  if (existingTicket) {
    if (existingTicket.NumberOfTickets > 1) {
      existingTicket.NumberOfTickets--
    } else {
      selectedTickets.value = selectedTickets.value.filter((t) => t.TicketId !== ticket.TicketId)
    }
  }
}
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
    <v-container fluid class="bg-lightgray px-0 mx-1">
      <v-card class="pa-5 elevation-0">
        <v-row>
          <v-col class="border-e"
            ><h2 class="mb-2 text-center">Select Date</h2>
            <v-btn
              class="w-100 mb-3"
              v-for="date of availableDates"
              :class="selectedDate === date ? 'primary-button' : 'secondary-button'"
              @click="selectDate(date)"
            >
              {{ dateFormatter.dddotmmdotyyyy(date) }}
            </v-btn>
          </v-col>
          <v-col class="border-e"
            ><h2 class="mb-2 text-center">Choose Tickets</h2>
            <div v-for="ticket of tickets" v-if="selectedDate">
              <div v-if="ticket.AvailableTickets > 0">
                <v-btn class="w-100 mb-3 secondary-button" @click="addTicket(ticket)">
                  {{ ticket.Name }}
                </v-btn>
              </div>
            </div>
          </v-col>
          <v-col
            ><h2 class="mb-2 text-center">Confirm</h2>
            <div v-for="ticket of selectedTickets">
              <v-btn class="w-100 mb-3 secondary-button" @click="removeTicket(ticket)">
                {{ ticket.TicketName }} - {{ ticket.NumberOfTickets }}
              </v-btn>
            </div>
            <v-btn class="w-100 mb-3 secondary-button"> Confirm </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
