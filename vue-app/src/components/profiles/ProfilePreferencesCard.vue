<script setup lang="ts">
import type { IFeature } from '@/interfaces/IFeature'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { FeatureService } from '@/services/FeatureService'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const featureService = new FeatureService(axios)
const availableFeatures = ref<IFeature[]>([])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

const getValueForFeatureID = (featureID: number) => {
  const feature = availableFeatures.value.find((feature) => feature.id === featureID)
  return feature ? feature.value : ' '
}

onMounted(() => {
  featureService.getAvailableFeatures().then((response) => {
    availableFeatures.value = response
  })
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Preferences / Notes</span></v-toolbar-title>
      <v-btn class="text-gray" icon> <v-icon>mdi-calendar-text-outline</v-icon></v-btn>
    </v-toolbar>

    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div class="mb-2">
        <span class="profile-card-caption">Room Preferences </span><br />
        <div class="d-flex">
          <div
            v-for="preferenceFeatureID of profileToBeEdited.preferencesFeatureIDs"
            :key="preferenceFeatureID"
          >
            <div class="profiles-pill">
              {{ getValueForFeatureID(preferenceFeatureID) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Preferred Room </span><br />
        <div class="d-flex">
          <div class="profiles-pill">
            {{ profileToBeEdited.preferencesDefaultObjectID }}
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Note</span><br />
        {{ profileToBeEdited.preferencesNote }}
      </div>
    </v-container>
  </div>
</template>
