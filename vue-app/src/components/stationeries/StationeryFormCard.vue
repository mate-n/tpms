<script setup lang="ts">
import { LanguageService } from '@/services/LanguageService'
import { Stationery } from '@/shared/classes/Stationery'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import { onMounted, ref, type Ref } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { StationeryService } from '@/services/StationeryService'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const axios: AxiosStatic | undefined = inject('axios')
const languageService = new LanguageService(axios)
const stationeryService = new StationeryService(axios)
const stationeryToBeEdited: Ref<Stationery> = ref(new Stationery())
const emits = defineEmits(['close', 'stationeryAdded'])
const languages: Ref<ILanguage[]> = ref([])

onMounted(() => {
  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
})
const send = () => {
  if (userStore.currentProfile) {
    stationeryToBeEdited.value.profileID = userStore.currentProfile.id
  }
  stationeryService.post(stationeryToBeEdited.value).then((addedStationery) => {
    emits('stationeryAdded', addedStationery)
  })
}
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Guest letter</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray">
      <v-card class="pa-3">
        <v-autocomplete
          label="Language"
          v-model="stationeryToBeEdited.language"
          :items="languages"
          item-title="value"
          variant="underlined"
          class="me-3 required-input"
        ></v-autocomplete>
        <v-autocomplete
          label="Template"
          variant="underlined"
          :items="['Default guest letter']"
          v-model="stationeryToBeEdited.template"
        ></v-autocomplete>
        <v-autocomplete
          label="Type"
          variant="underlined"
          :items="['Send as email', 'Print as PDF', 'Create an Open Office file (.odt).', 'JSON']"
          v-model="stationeryToBeEdited.type"
        ></v-autocomplete>
        <v-autocomplete
          label="Recipient"
          variant="underlined"
          :items="['This guest', 'Guest profile search', 'Email address']"
          v-model="stationeryToBeEdited.recipient"
        ></v-autocomplete>
        <v-checkbox
          label="Additional text"
          class="mt-1"
          v-model="stationeryToBeEdited.addAdditionalText"
        ></v-checkbox>
        <v-textarea
          v-if="stationeryToBeEdited.addAdditionalText"
          label="Additional text"
          class="mt-1"
          v-model="stationeryToBeEdited.additionalText"
        ></v-textarea>
      </v-card>
      <div class="d-flex justify-end mt-3">
        <v-btn class="secondary-button">Cancel</v-btn>
        <v-btn class="ml-2 primary-button" @click="send()">Send</v-btn>
      </div>
    </v-container>
  </div>
</template>
