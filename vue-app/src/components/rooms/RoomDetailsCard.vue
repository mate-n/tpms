<script setup lang="ts">
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'

const emits = defineEmits(['close'])
defineProps({
  protelAvailability: { type: Object as () => IProtelAvailability, required: true }
})
</script>
<template>
  <div class="standard-card bg-lightgray">
    <v-toolbar class="standard-card-toolbar">
      <v-toolbar-title><span class="text-primary">Room Details</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>

    <v-container fluid class="profiles-card-container">
      <v-card>
        <v-carousel hide-delimiters>
          <v-carousel-item src="https://picsum.photos/800/600?sig=1" cover></v-carousel-item>

          <v-carousel-item src="https://picsum.photos/800/600?sig=2" cover></v-carousel-item>

          <v-carousel-item src="https://picsum.photos/800/600?sig=3" cover></v-carousel-item>
        </v-carousel>
        <v-card-text>
          <h1>{{ protelAvailability.property_name }}</h1>
          <h2 class="mt-3">{{ protelAvailability.room_type_name }}</h2>
          <v-divider class="my-2"></v-divider>
          <div>
            <h3 class="font-weight-bold mb-2">What this place offers</h3>
            <div class="ms-4" v-html="protelAvailability.features"></div>
          </div>
          <div class="mt-3">
            <h3 class="font-weight-bold mb-2">Room Rate</h3>
            {{ protelAvailability.rates_data[0].room_rate }}
          </div>
          <div class="mt-3">
            <h3 class="font-weight-bold mb-2">Free Rooms</h3>
            {{ protelAvailability.availability_count }}
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
