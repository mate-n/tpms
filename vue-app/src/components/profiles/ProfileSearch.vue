<script setup lang="ts">
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
profileService.getProfile().then((response) => {
  console.log(response)
})
const emit = defineEmits(['close'])
const close = () => emit('close')
const type = ref('Private')
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Profile Search</v-toolbar-title>
    <div class="border-s h-100 d-flex px-3 align-center">
      <v-button>NEW PROFILE</v-button>
    </div>
    <div class="border-s h-100 d-flex px-5 align-center" @click="close()">
      <v-button><v-icon>mdi-close</v-icon></v-button>
    </div>
  </v-toolbar>
  <v-container fluid>
    <div class="d-flex">
      <v-text-field label="Name" variant="underlined" class="me-3"></v-text-field>
      <v-text-field label="First Name" variant="underlined" class="me-3"></v-text-field>
      <v-text-field label="Email" variant="underlined" class="me-3"></v-text-field>
      <v-text-field label="City" variant="underlined" class="me-3"></v-text-field>
      <v-text-field label="Profile ID" variant="underlined" class="me-3"></v-text-field>
      <v-text-field label="Type" variant="underlined" class="me-3"></v-text-field>
      <v-select label="Type" v-model="type" :items="['Private']" :disabled="true"></v-select>
      <v-btn class="bg-primary"><v-icon>mdi-magnify</v-icon>Search</v-btn>
    </div>
  </v-container>
</template>
