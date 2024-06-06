<script setup lang="ts">
import type { IReservation } from '@/shared/interfaces/IReservation'
import { inject, onMounted, ref } from 'vue'
import type { IRate } from '@/shared/interfaces/IRate'
import type { AxiosStatic } from 'axios'
import { RateService } from '@/services/RateService'
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })
const availableRates = ref<IRate[]>([])
const axios: AxiosStatic | undefined = inject('axios')
const rateService = new RateService(axios)
onMounted(() => {
  rateService.getAvailableRates().then((response) => {
    availableRates.value = response
  })
})

const avgRate = ref<number>(28.656)
const totalRate = ref<number>(85.968)
</script>
<template>
  <div class="standard-card">
    <v-toolbar class="standard-card-toolbar">
      <v-toolbar-title><span class="text-primary">Rate Details</span></v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="mb-2">
        <v-col cols="10">
          <v-autocomplete
            label="Rate Code"
            variant="underlined"
            :items="availableRates"
            item-title="value"
            :multiple="true"
          ></v-autocomplete>
        </v-col>
        <v-col cols="2" class="d-flex align-center text-gray">
          <v-icon>mdi-printer-off-outline</v-icon></v-col
        >
      </v-row>

      <v-row>
        <v-col cols="5">
          <v-text-field label="Avg. Rate" v-model="avgRate" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="5">
          <v-text-field label="Total Rate" v-model="totalRate" variant="underlined"></v-text-field>
        </v-col>
        <v-col cols="2" class="d-flex align-center text-gray">
          <v-icon>mdi-menu</v-icon>
        </v-col>
      </v-row>
      <v-row class="mb-2">
        <v-col cols="10">
          <span class="standard-caption">Packages</span>
          <div class="bg-lightgray">&nbsp;</div></v-col
        >
        <v-col cols="2" class="d-flex align-end text-gray">
          <v-icon>mdi-inbox-arrow-down-outline</v-icon></v-col
        >
      </v-row>
      <v-row class="mb-2">
        <v-col cols="10">
          <span class="standard-caption">Allotment</span>
          <div class="bg-lightgray">&nbsp;</div></v-col
        >
        <v-col cols="2" class="d-flex align-end text-gray"> <v-icon>mdi-magnify</v-icon></v-col>
      </v-row>
    </v-container>
  </div>
</template>
