<script setup lang="ts">
import { TicketHelper } from '@/helpers/TicketHelper'
import type { ITicket } from '@/shared/interfaces/ITicket'
import { computed } from 'vue'
const ticketHelper = new TicketHelper()
const props = defineProps({
  tickets: { type: Object as () => ITicket[], required: true },
  showButtons: { type: Boolean, default: false }
})
const ticketsGrouped = computed(() => {
  const definedTickets = props.tickets.filter((ticket) => ticket !== undefined) as ITicket[]
  return ticketHelper.groupTicketsByTicketId(definedTickets)
})
const emits = defineEmits(['addTicket', 'removeTicket'])

const addTicket = (ticket: ITicket) => {
  emits('addTicket', ticket)
}

const removeTicket = (ticket: ITicket) => {
  emits('removeTicket', ticket)
}
</script>
<template>
  <v-table class="border">
    <tbody>
      <tr v-for="group in ticketsGrouped" :key="group[1][0].TicketId">
        <td>{{ group[1].length }} x</td>
        <td>{{ group[1][0].Name }}</td>
        <td>{{ group[1][0].Price }}</td>
        <td class="border-e border-s">
          {{ group[1].length * group[1][0].Price }}
        </td>
        <td v-if="showButtons">
          <div class="d-flex">
            <v-btn variant="text" @click="addTicket(group[1][0])" icon>
              <v-icon class="text-gray"> mdi-plus </v-icon>
            </v-btn>
            <v-btn variant="text" @click="removeTicket(group[1][0])" icon>
              <v-icon class="text-gray"> mdi-minus </v-icon>
            </v-btn>
          </div>
        </td>
      </tr>
      <tr class="bg-lightgray">
        <td></td>
        <td></td>
        <td class="font-weight-bold">Total:</td>
        <td class="font-weight-bold border-s">
          {{ ticketHelper.getTotalPrice(tickets) }}
        </td>
        <td v-if="showButtons"></td>
      </tr>
    </tbody>
  </v-table>
</template>
