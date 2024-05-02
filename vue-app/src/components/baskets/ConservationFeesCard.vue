<script setup lang="ts">
import { useBasketItemsStore } from '@/stores/basketItems'
import ReservationInBasketCard from './ReservationInBasketCard.vue'
import ConservationFeeCard from './ConservationFeeCard.vue'
import { useFullscreen } from '@/composables/Fullscreen'
import { ref } from 'vue'

const emits = defineEmits(['close'])

const { isFullScreen, toggleFullScreen } = useFullscreen()
const newConservationFeeDialog = ref(false)
</script>
<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Conservation Fees</span></v-toolbar-title>
      <div class="profiles-card-toolbar-button" @click="newConservationFeeDialog = true">Add</div>
      <div class="profiles-card-toolbar-button" @click="toggleFullScreen()">
        <template v-if="isFullScreen">
          <v-icon size="large">mdi-fullscreen-exit</v-icon>
        </template>
        <template v-if="!isFullScreen">
          <v-icon size="large">mdi-fullscreen</v-icon>
        </template>
      </div>
      <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray"> </v-container>
  </div>
  <v-dialog v-model="newConservationFeeDialog" scrollable>
    <v-card>
      <ConservationFeeCard @close="newConservationFeeDialog = false" />
    </v-card>
  </v-dialog>
</template>
