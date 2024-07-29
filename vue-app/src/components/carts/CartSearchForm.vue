<script setup lang="ts">
import { inject, ref } from 'vue'
import type { AxiosStatic } from 'axios'
import { CartService } from '@/services/backend-middleware/CartService'
const axios2: AxiosStatic | undefined = inject('axios2')
const cartService = new CartService(axios2)
const emit = defineEmits(['found'])
const searchField = ref<string>('')
const clickOnSearch = async () => {
  loading.value = true
  const dataFromAPI = await cartService.retrieveCart(searchField.value)
  if (dataFromAPI) {
    emit('found', [dataFromAPI])
  } else {
    emit('found', [])
  }
  loading.value = false
}
const loading = ref(false)
</script>

<template>
  <v-toolbar
    class="bg-primary text-white d-flex justify-space-between"
    :title="$t('itineraryReservation.plural')"
    app
  >
  </v-toolbar>
  <v-container fluid class="bg-lightgray">
    <v-row class="d-flex align-center">
      <v-col>
        <v-text-field
          v-model="searchField"
          label="Search"
          placeholder="Cart Number"
          variant="underlined"
        ></v-text-field>
      </v-col>

      <v-col class="d-flex justify-space-between">
        <v-btn class="primary-button mr-3 w-100" @click="clickOnSearch()">SEARCH</v-btn>
      </v-col>
    </v-row>
    <v-progress-linear v-if="loading" color="primary" indeterminate></v-progress-linear>
  </v-container>
</template>
