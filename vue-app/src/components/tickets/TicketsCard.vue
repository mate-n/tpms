<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { TicketService } from '@/services/TicketService'
import type { ITicket } from '@/shared/interfaces/ITicket'
import type { Ref } from 'vue'
import { onMounted, ref } from 'vue'
import TicketsTable from '@/components/tickets/TicketsTable.vue'
import type { IEntityWithTickets } from '@/shared/interfaces/IEntityWithTickets'
const dateHelper = new DateHelper()
const ticketsService = new TicketService()
const emits = defineEmits(['close', 'addTicketsToReservation'])
const dateFormatter = new DateFormatter()
const entityWithTickets = defineModel({
  required: true,
  type: Object as () => IEntityWithTickets
})
const selectedDate: Ref<Date | undefined> = ref(undefined)

const availableDates: Ref<Date[]> = ref([])

const tickets: Ref<ITicket[]> = ref([])

const selectedTickets: Ref<ITicket[]> = ref([])

onMounted(() => {
  ticketsService.getAll().then((data) => {
    tickets.value = data
    addTicketsFromReservationToSelectedTickets()
  })
  selectDate(props.arrivalDate)
  setAvailableDates()
})

const props = defineProps({
  arrivalDate: { type: Object as () => Date, required: true },
  departureDate: { type: Object as () => Date, required: true },
  propertyName: { type: String, required: true }
})

const setAvailableDates = () => {
  availableDates.value = []
  let currentDate = new Date(props.arrivalDate)
  while (currentDate <= props.departureDate) {
    availableDates.value.push(currentDate)
    currentDate = dateHelper.addDays(currentDate, 1)
  }
}

const selectDate = (date: Date) => {
  selectedDate.value = date
}

const addTicketsFromReservationToSelectedTickets = () => {
  for (const ticket of entityWithTickets.value.tickets) {
    selectedTickets.value.push(ticket)
  }
}

const addTicket = (ticket: ITicket) => {
  selectedTickets.value.push(ticket)
  showSaveButton.value = true
}

const removeTicket = (ticket: ITicket) => {
  const index = selectedTickets.value.findIndex((t) => t.TicketId === ticket.TicketId)
  if (index !== -1) {
    selectedTickets.value.splice(index, 1)
    showSaveButton.value = true
  }
}

const addTicketsToReservation = () => {
  entityWithTickets.value.tickets = []
  for (const ticket of selectedTickets.value) {
    if (selectedDate.value) {
      ticket.Date = selectedDate.value
    }
    entityWithTickets.value.tickets.push(ticket)
  }
  emits('addTicketsToReservation')
}

const showSaveButton = ref(false)
</script>

<template>
  <div class="standard-dialog-card bg-lightgray">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title
        ><span class="text-primary">Tickets</span> - {{ propertyName }} -
        {{ dateFormatter.dddotmmdotyyyy(arrivalDate) }} -
        {{ dateFormatter.dddotmmdotyyyy(departureDate) }}</v-toolbar-title
      >
      <div
        v-if="showSaveButton"
        class="standard-card-toolbar-button text-primary"
        @click="addTicketsToReservation()"
      >
        <v-icon size="large">mdi-content-save-outline</v-icon>
      </div>
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
              :key="date.toISOString()"
              :class="
                selectedDate && dateHelper.isSameDay(selectedDate, date)
                  ? 'primary-button'
                  : 'secondary-button'
              "
              @click="selectDate(date)"
            >
              {{ dateFormatter.dddotmmdotyyyy(date) }}
            </v-btn>
          </v-col>
          <v-col class="border-e"
            ><h2 class="mb-2 text-center">Choose Tickets</h2>
            <div v-if="selectedDate">
              <div v-for="ticket of tickets" :key="ticket.TicketId">
                <div v-if="ticket.AvailableTickets > 0">
                  <v-btn class="w-100 mb-3 secondary-button" @click="addTicket(ticket)">
                    {{ ticket.Name }}
                  </v-btn>
                </div>
              </div>
            </div>
          </v-col>
          <v-col
            ><h2 class="mb-2 text-center">Confirm</h2>
            <TicketsTable
              :tickets="selectedTickets"
              @add-ticket="(ticket) => addTicket(ticket)"
              @remove-ticket="(ticket) => removeTicket(ticket)"
              :show-buttons="true"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
