<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { PropertyService } from '@/services/PropertyService'
import { TicketService } from '@/services/TicketService'
import type { IProperty } from '@/shared/interfaces/IProperty'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { ITicket } from '@/shared/interfaces/ITicket'
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { computed, inject, onMounted, ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const propertyService = new PropertyService(axios)
const dateHelper = new DateHelper()
const ticketsService = new TicketService()
const emits = defineEmits(['close', 'addTicketsToReservation'])
const dateFormatter = new DateFormatter()

const reservation = defineModel({ required: true, type: Object as () => IReservation })

const selectedDate: Ref<Date | undefined> = ref(undefined)

const availableDates: Ref<Date[]> = ref([
  new Date(),
  dateHelper.addDays(new Date(), 1),
  dateHelper.addDays(new Date(), 2)
])

const tickets: Ref<ITicket[]> = ref([])

const selectedTickets: Ref<ITicket[]> = ref([])

onMounted(() => {
  ticketsService.getAll().then((data) => {
    tickets.value = data
    addTicketsFromReservationToSelectedTickets()
  })
})

const selectDate = (date: Date) => {
  selectedDate.value = date
}

const addTicketsFromReservationToSelectedTickets = () => {
  for (const ticketID of reservation.value.ticketIDs) {
    const ticket = tickets.value.find((t) => t.TicketId === ticketID)
    if (ticket) {
      addTicket(ticket)
    }
  }
}

const addTicket = (ticket: ITicket) => {
  selectedTickets.value.push(ticket)
}

const removeTicket = (ticket: ITicket) => {
  const index = selectedTickets.value.findIndex((t) => t.TicketId === ticket.TicketId)
  if (index !== -1) {
    selectedTickets.value.splice(index, 1)
  }
}

const property: Ref<IProperty | undefined> = ref(undefined)

onMounted(() => {
  if (!reservation.value.propertyID) return
  propertyService.get(reservation.value.propertyID).then((response) => {
    property.value = response
  })
})

const getTotalPrice = () => {
  let total = 0
  for (const ticket of selectedTickets.value) {
    total += ticket.Price
  }
  return total
}

const addTicketsToReservation = () => {
  reservation.value.ticketIDs = []
  for (const ticket of selectedTickets.value) {
    reservation.value.ticketIDs.push(ticket.TicketId)
  }
  emits('addTicketsToReservation')
}

const selectedTicketsGrouped = computed(() => {
  const grouped = new Map<number, ITicket[]>()
  for (const ticket of selectedTickets.value) {
    if (!grouped.has(ticket.TicketId)) {
      grouped.set(ticket.TicketId, [])
    }
    grouped.get(ticket.TicketId)?.push(ticket)
  }
  return grouped
})
</script>

<template>
  <div class="standard-dialog-card bg-lightgray">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title
        ><span class="text-primary">Tickets</span> - {{ property?.name }} -
        {{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }} -
        {{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}</v-toolbar-title
      >
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
              :class="selectedDate === date ? 'primary-button' : 'secondary-button'"
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
            <v-table>
              <tbody>
                <tr v-for="group in selectedTicketsGrouped" :key="group[1][0].TicketId">
                  <td>{{ group[1].length }} x</td>
                  <td>{{ group[1][0].Name }}</td>
                  <td>{{ group[1][0].Price }}</td>
                  <td class="border-e border-s">
                    {{ group[1].length * group[1][0].Price }}
                  </td>
                  <td class="d-flex justify-end">
                    <v-btn variant="text" @click="addTicket(group[1][0])" icon>
                      <v-icon class="text-gray"> mdi-plus </v-icon>
                    </v-btn>
                    <v-btn variant="text" @click="removeTicket(group[1][0])" icon>
                      <v-icon class="text-gray"> mdi-minus </v-icon>
                    </v-btn>
                  </td>
                </tr>
                <tr class="bg-lightgray">
                  <td></td>
                  <td></td>
                  <td class="font-weight-bold">Total:</td>
                  <td class="font-weight-bold border-s border-e">{{ getTotalPrice() }}</td>
                  <td></td>
                </tr>
              </tbody>
            </v-table>

            <v-btn
              class="w-100 mb-3 primary-button mt-3"
              v-if="selectedTickets.length > 0"
              @click="addTicketsToReservation()"
              >Add</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
