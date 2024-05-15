<script setup lang="ts">
import { BookableObjectService } from '@/services/BookableObjectService'
import { FeatureService } from '@/services/FeatureService'
import { LanguageService } from '@/services/LanguageService'
import ProfileService from '@/services/ProfileService'
import type { IBookableObject } from '@/shared/interfaces/IBookableObject'
import type { IFeature } from '@/shared/interfaces/IFeature'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfilePreferencesPatchBody } from '@/shared/interfaces/profiles/IProfilePreferencesPatchBody'
import { inject, onBeforeMount, ref, watch, type Ref } from 'vue'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const emits = defineEmits(['close'])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})
const showSaveButton = ref(false)
const featureService = new FeatureService(axios)
const profileService = new ProfileService(axios)
const languageService = new LanguageService(axios)
const bookableObjectService = new BookableObjectService(axios)
const featuresInDropdown = ref<IFeature[]>([])
const bookableObjectsInDropdown = ref<IBookableObject[]>([])
const languages: Ref<ILanguage[]> = ref([])

onBeforeMount(() => {
  featureService.getAvailableFeatures().then((response) => {
    featuresInDropdown.value = response
  })

  bookableObjectService.getAvailableBookableObjects().then((response) => {
    bookableObjectsInDropdown.value = response
  })

  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
})

watch(
  profileToBeEdited,
  () => {
    showSaveButton.value = true
  },
  { deep: true }
)

const saveProfilePreferences = () => {
  if (!profileToBeEdited.value.id) return

  const profilePreferencesPatchBody: IProfilePreferencesPatchBody = {
    id: profileToBeEdited.value.id,
    preferencesFeatureIDs: profileToBeEdited.value.preferencesFeatureIDs,
    preferencesDefaultObjectID: profileToBeEdited.value.preferencesDefaultObjectID,
    preferencesNote: profileToBeEdited.value.preferencesNote,
    preferencesLanguage: profileToBeEdited.value.preferencesLanguage
  }
  profileService
    .patchProfilePreferences(profilePreferencesPatchBody)
    .then((response: IProfilePreferencesPatchBody) => {
      profileToBeEdited.value = Object.assign(profileToBeEdited.value, response)
      showSaveButton.value = false
    })
}
</script>

<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title>Profile Preferences </v-toolbar-title>
    <div
      v-if="showSaveButton"
      class="profiles-card-toolbar-button text-primary"
      @click="saveProfilePreferences()"
    >
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
    <v-container fluid class="bg-white mb-2">
      <v-textarea
        v-model="profileToBeEdited.preferencesNote"
        variant="underlined"
        label="Note"
      ></v-textarea>
    </v-container>

    <v-container fluid class="bg-white mb-2">
      <v-autocomplete
        label="Language"
        prepend-icon="mdi-microphone-outline"
        v-model="profileToBeEdited.preferencesLanguage"
        :items="languages"
        item-title="value"
        variant="underlined"
        class="me-3"
      ></v-autocomplete>
    </v-container>
  </v-container>
</template>
