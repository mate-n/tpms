<script setup lang="ts">
import type { IRate } from '@/interfaces/IRate'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { RateService } from '@/services/RateService'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const rateService = new RateService(axios)
const availableRates = ref<IRate[]>([])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

onMounted(() => {
  rateService.getAvailableRates().then((response) => {
    availableRates.value = response
  })
})
</script>

<template>
  <div class="d-flex">
    <v-text-field
      prepend-icon="mdi-briefcase-variant-outline"
      v-model="profileToBeEdited.company"
      label="Company"
      variant="underlined"
    ></v-text-field>
    <div class="d-flex align-center">
      <v-icon>mdi-magnify</v-icon>
    </div>
  </div>

  <v-text-field
    v-model="profileToBeEdited.occupation"
    label="Occupation"
    variant="underlined"
  ></v-text-field>

  <v-select
    label="Special Rates"
    variant="underlined"
    :v-model="profileToBeEdited.additionalInfoDefaultRateIDs"
    :items="availableRates"
    item-title="value"
    :multiple="true"
  ></v-select>

  <v-row>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.licensePlate"
        label="License Plate"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.passport"
        label="Passport Number"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
