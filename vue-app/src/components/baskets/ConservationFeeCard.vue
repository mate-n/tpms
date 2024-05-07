<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import ReservationInBasketCard from './ReservationInBasketCard.vue'
const basketItemsStore = useBasketItemsStore()

const emits = defineEmits(['close'])
const removeAllReservations = () => {
  for (const reservation of basketItemsStore.reservations) {
    basketItemsStore.removeReservation(reservation)
  }
}
</script>
<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">New Conservation Fee</span></v-toolbar-title>
      <div class="profiles-card-toolbar-button">
        <v-icon size="large">mdi-content-save-outline</v-icon>
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-dialog-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray d-flex">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Charge</v-card-title>
            <v-card-text>
              <v-select label="Room" variant="underlined" item-title="value"></v-select>
              <v-select label="Item" variant="underlined" item-title="value"></v-select>
              <v-checkbox label="Overwrite Item"></v-checkbox>
              <v-select label="Currency" variant="underlined" item-title="value"></v-select>
              <v-row>
                <v-col>
                  <v-select label="Unit price" variant="underlined" item-title="value"></v-select>
                </v-col>
                <v-col>
                  <v-select label="Quantity" variant="underlined" item-title="value"></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col>
          <v-card class="mb-2">
            <v-card-title>Time-span</v-card-title>
            <v-card-text>
              <v-select variant="underlined" item-title="value"></v-select>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title>Days of Week</v-card-title>
            <v-card-text>
              <v-select label="Select" variant="underlined" item-title="value"></v-select>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
