<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'

const emits = defineEmits(['close'])
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })
</script>
<template>
  <div class="standard-card bg-lightgray">
    <v-toolbar class="standard-card-toolbar">
      <v-toolbar-title><span class="text-primary">Policy Info</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>

    <v-container fluid class="profiles-card-container">
      <v-card>
        <v-card-text>
          <v-select
            label="Guarantee Info"
            variant="underlined"
            :items="[]"
            item-title="value"
            item-value="id"
          ></v-select>

          <v-select
            label="Cancellation Info"
            variant="underlined"
            :items="[]"
            item-title="value"
            item-value="id"
          ></v-select>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
