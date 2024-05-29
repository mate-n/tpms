<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { TicketHelper } from '@/helpers/TicketHelper'
import type { ITicket } from '@/shared/interfaces/ITicket'
import { computed, onMounted, ref } from 'vue'
const dateFormatter = new DateFormatter()
const ticketHelper = new TicketHelper()
const props = defineProps({
  tickets: { type: Object as () => ITicket[], required: true },
  showButtons: { type: Boolean, default: false },
  collapsible: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
  showDate: { type: Boolean, default: false }
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

const collsapsed = ref(false)

const collapse = () => {
  collsapsed.value = !collsapsed.value
}

onMounted(() => {
  collsapsed.value = props.collapsed
})
</script>
<template>
  <v-table class="tickets-table border-0" density="compact">
    <thead class="border-0">
      <tr>
        <th>Amount</th>
        <th>Item</th>
        <th v-if="showDate">Date</th>

        <th>Price</th>
        <th>Sub-Total</th>
        <th v-if="showButtons"></th>
      </tr>
    </thead>

    <tbody class="border-0">
      <template v-if="!collsapsed">
        <tr v-for="group in ticketsGrouped" :key="group[1][0].TicketId">
          <td>{{ group[1].length }} x</td>
          <td>{{ group[1][0].Name }}</td>
          <td v-if="showDate">{{ dateFormatter.dddotmmdotyyyy(group[1][0].Date) }}</td>
          <td>{{ group[1][0].Price }}</td>
          <td>
            {{ group[1].length * group[1][0].Price }}
          </td>
          <td v-if="showButtons">
            <div class="d-flex justify-end">
              <v-btn variant="text" @click="addTicket(group[1][0])" class="bg-lightgray me-1" icon>
                <v-icon> mdi-plus </v-icon>
              </v-btn>
              <v-btn variant="text" @click="removeTicket(group[1][0])" class="bg-lightgray" icon>
                <v-icon> mdi-minus </v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
      <tr class="bg-lightblue">
        <td>
          <v-btn v-if="collapsible" @click="collapse()" variant="text" icon>
            <v-icon v-if="collsapsed" class="text-gray"> mdi-chevron-down </v-icon>
            <v-icon v-else class="text-gray"> mdi-chevron-up </v-icon>
          </v-btn>
        </td>
        <td></td>
        <td v-if="showDate"></td>
        <td class="font-weight-bold">Total:</td>
        <td class="font-weight-bold border-s">
          {{ ticketHelper.getTotalPrice(tickets).toFixed(2) }}
        </td>
        <td v-if="showButtons"></td>
      </tr>
    </tbody>
  </v-table>
</template>
