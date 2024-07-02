<script setup lang="ts">
import { RateService } from '@/services/RateService'
import type { IRate } from '@/shared/interfaces/IRate'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import ProfileSearch from './ProfileSearch.vue'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
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

  profileService.findAll().then((response) => {
    companies.value = response
  })
})

const profileSearchDialog = ref(false)
const profileSelected = (profile: IProfile) => {
  profileToBeEdited.value.companyID = profile.id
  profileSearchDialog.value = false
}

const companies: Ref<IProfile[]> = ref([])
watch(profileToBeEdited, () => {}, { deep: true })

const companyUpdateSearch = () => {
  companySearchLoading.value = true

  profileService.findAll().then((response) => {
    companySearchLoading.value = false
    companies.value = response
  })
}

const companySearchLoading = ref(false)
</script>

<template>
  <div class="d-flex">
    <v-autocomplete
      :loading="companySearchLoading"
      label="Company"
      variant="underlined"
      v-model="profileToBeEdited.companyID"
      :items="companies"
      @update:search="companyUpdateSearch"
      item-title="name"
      item-value="id"
    ></v-autocomplete>
    <div class="d-flex align-center" @click="profileSearchDialog = true">
      <v-icon>mdi-magnify</v-icon>
    </div>
  </div>

  <v-text-field
    v-model="profileToBeEdited.occupation"
    label="Occupation"
    variant="underlined"
  ></v-text-field>

  <v-autocomplete
    label="Special Rates"
    variant="underlined"
    :v-model="profileToBeEdited.additionalInfoDefaultRateIDs"
    :items="availableRates"
    item-title="value"
    :multiple="true"
  ></v-autocomplete>

  <v-row>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.licensePlate"
        label="License Plate"
        variant="underlined"
      ></v-text-field>
    </v-col>
    <v-col> </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-text-field
        label="Roomseker ID"
        v-model="profileToBeEdited.roomseekerclientcode"
        variant="underlined"
        type="number"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.tpmsProfileID"
        label="TPMS-Profile ID"
        variant="underlined"
        type="number"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-dialog v-model="profileSearchDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearch
        :profile-look-up-post-body="new ProfileLookUpPostBody()"
        @close="profileSearchDialog = false"
        @profile-selected="(profile) => profileSelected(profile)"
      ></ProfileSearch>
    </v-card>
  </v-dialog>
</template>
