<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IReservation } from '@/shared/interfaces/IReservation'
const emits = defineEmits(['close'])
const dateFormatter = new DateFormatter()
const props = defineProps<{
  stationery: IReservation
}>()
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
      <v-card> Test </v-card>
    </v-container>
  </div>
</template>
