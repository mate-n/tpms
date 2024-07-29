<script setup lang="ts">
import router from '@/router'
import type {
  ICart,
  IRetrieveCartResponseBody
} from '@/shared/interfaces/cart/IRetrieveCartResponseBody'
import { computed, ref } from 'vue'

const availableTableDataHeaders = ref([
  { key: 'unique_number', title: 'Cart Number', selected: true },
  { key: 'profile_number', title: 'Profile Number', selected: true },
  { key: 'cart_type', title: 'Cart Type', selected: true },
  { key: 'status', title: 'Status', selected: true },
  { key: 'payment_amount', title: 'Payment Amount', selected: true },
  { key: 'action', title: 'Action', selected: true }
])

const props = defineProps({
  retrieveCartResponseBodies: {
    type: Object as () => IRetrieveCartResponseBody[],
    required: true
  }
})

const carts = computed(() => {
  return props.retrieveCartResponseBodies.map((body) => {
    return body.cart
  })
})

const changeColumnsDialog = ref(false)

const isSpecialColumn = (header: string) => {
  return ['collapse', 'arrivalDate', 'departureDate', 'action', 'settings'].includes(header)
}

const clickOnEdit = (cart_number: string) => {
  router.push('/itinerary-reservations/' + cart_number)
}
</script>

<template>
  <v-data-table :headers="availableTableDataHeaders.filter((h) => h.selected)" :items="carts">
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
              {{ row.item[header.key as keyof ICart] }}
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
                @click="clickOnEdit(row.item.unique_number)"
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
