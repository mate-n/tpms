<script setup lang="ts">
import { FeatureService } from '@/services/FeatureService'
import { computed, onBeforeMount, ref } from 'vue'
import ProfilePreferencesForm from './ProfilePreferencesForm.vue'
import { BookableObjectService } from '@/services/BookableObjectService'
import type { IBookableObject } from '@/shared/interfaces/IBookableObject'
import type { IFeature } from '@/shared/interfaces/IFeature'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
const axios2: AxiosStatic | undefined = inject('axios2')
const featureService = new FeatureService(axios2)
const bookableObjectService = new BookableObjectService(axios2)
const availableFeatures = ref<IFeature[]>([])
const availableBookableObjects = ref<IBookableObject[]>([])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

const getValueForFeatureID = (featureID: number) => {
  const feature = availableFeatures.value.find((feature) => feature.id === featureID)
  return feature ? feature.value : ' '
}

const editProfilePreferencesDialog = ref(false)

onBeforeMount(() => {
  featureService.getAvailableFeatures().then((response) => {
    availableFeatures.value = response
  })

  bookableObjectService.getAvailableBookableObjects().then((response) => {
    availableBookableObjects.value = response
  })
})

const preferredRoom = computed(() => {
  return availableBookableObjects.value.find(
    (bookableObject: IBookableObject) =>
      bookableObject.id === profileToBeEdited.value.preferencesDefaultObjectID
  )
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Preferences / Notes</span></v-toolbar-title>
      <v-btn class="text-gray" @click="editProfilePreferencesDialog = true" icon>
        <v-icon>mdi-calendar-text-outline</v-icon></v-btn
      >
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
          <div class="profiles-pill" v-if="preferredRoom">
            {{ preferredRoom.value }}
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Note</span><br />
        {{ profileToBeEdited.preferencesNote }}
      </div>
    </v-container>
  </div>
  <v-dialog v-model="editProfilePreferencesDialog" scrollable max-width="500">
    <v-card>
      <ProfilePreferencesForm
        v-model="profileToBeEdited"
        @close="editProfilePreferencesDialog = false"
      ></ProfilePreferencesForm>
    </v-card>
  </v-dialog>
</template>
@/shared/interfaces/IFeature@/shared/interfaces/profiles/IProfile@/shared/interfaces/IBookableObject
