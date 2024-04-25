<script setup lang="ts">
import type { IBookableObject } from '@/interfaces/IBookableObject'
import type { IFeature } from '@/interfaces/IFeature'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { BookableObjectService } from '@/services/BookableObjectService'
import { FeatureService } from '@/services/FeatureService'
import type { AxiosStatic } from 'axios'
import { inject, onBeforeMount, ref } from 'vue'
const emits = defineEmits(['close'])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})
const showSaveButton = ref(false)
const axios: AxiosStatic | undefined = inject('axios')
const featureService = new FeatureService(axios)
const bookableObjectService = new BookableObjectService(axios)
const featuresInDropdown = ref<IFeature[]>([])
const bookableObjectsInDropdown = ref<IBookableObject[]>([])
onBeforeMount(() => {
  featureService.getAvailableFeatures().then((response) => {
    featuresInDropdown.value = response
  })

  bookableObjectService.getAvailableBookableObjects().then((response) => {
    bookableObjectsInDropdown.value = response
  })
})
</script>

<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title>Profile Preferences </v-toolbar-title>
    <div v-if="showSaveButton" class="profiles-card-toolbar-button text-primary">
      <v-icon size="large">mdi-content-save-outline</v-icon>
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-container fluid class="profiles-card-container">
    <v-container fluid class="bg-white mb-2">
      <v-select
        label="Room Preferences"
        variant="underlined"
        v-model="profileToBeEdited.preferencesFeatureIDs"
        :items="featuresInDropdown"
        item-title="value"
        item-value="id"
        :multiple="true"
      ></v-select>
      <v-select
        label="Preferred Room"
        variant="underlined"
        :items="bookableObjectsInDropdown"
        item-title="value"
        item-value="id"
        v-model="profileToBeEdited.preferencesDefaultObjectID"
      >
      </v-select>
    </v-container>
    <v-container fluid class="bg-white">
      <v-textarea
        v-model="profileToBeEdited.preferencesNote"
        class="bg-lightgray"
        variant="underlined"
        label="Note"
      ></v-textarea>
    </v-container>
  </v-container>
</template>
