<script setup lang="ts">
import { PriceFormatter } from '@/helpers/PriceFormatter'
import type { ICartContentItem } from '@/shared/interfaces/ICartContentItem'
import { computed, onMounted, ref } from 'vue'
const priceFormatter = new PriceFormatter()
const props = defineProps({
  cartContentItems: { type: Object as () => ICartContentItem[], required: true },
  showButtons: { type: Boolean, default: false },
  collapsible: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
  showDate: { type: Boolean, default: false }
})

const collsapsed = ref(false)

const collapse = () => {
  collsapsed.value = !collsapsed.value
}

onMounted(() => {
  collsapsed.value = props.collapsed
})

const totalPrice = computed(() => {
  return props.cartContentItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0)
})
</script>
<template>
  <v-table class="tickets-table border-0" density="compact">
    <thead class="border-0">
      <tr>
        <th>Date</th>
        <th>QTY</th>
        <th>Item</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>

    <tbody class="border-0">
      <template v-if="!collsapsed">
        <tr v-for="(item, index) in cartContentItems" :key="index">
          <td v-if="showDate">{{ item.date }}</td>
          <td>{{ item.quantity }} x</td>
          <td>{{ item.name }}</td>

          <td>{{ item.unitPrice }}</td>
          <td>
            {{ priceFormatter.formatPrice(item.quantity * item.unitPrice) }}
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
          {{ priceFormatter.formatPrice(totalPrice) }}
        </td>
        <td v-if="showButtons"></td>
      </tr>
    </tbody>
  </v-table>
</template>
