<script setup lang="ts">
import { TicketHelper } from '@/helpers/TicketHelper'
import type { ITicket } from '@/shared/interfaces/ITicket'
import { computed, onMounted, ref } from 'vue'
const ticketHelper = new TicketHelper()
const props = defineProps({
  tickets: { type: Object as () => ITicket[], required: true },
  showButtons: { type: Boolean, default: false },
  collapsible: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false }
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
  <v-table class="border">
    <tbody>
      <template v-if="!collsapsed">
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
      </template>
      <tr class="bg-lightgray">
        <td>
          <v-btn v-if="collapsible" @click="collapse()" variant="text" icon>
            <v-icon v-if="collsapsed" class="text-gray"> mdi-chevron-down </v-icon>
            <v-icon v-else class="text-gray"> mdi-chevron-up </v-icon>
          </v-btn>
        </td>
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
