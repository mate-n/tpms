<script setup lang="ts">
import ProfileService from '@/services/ProfileService'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'
import type { AxiosStatic } from 'axios'
import { inject, ref, type Ref } from 'vue'
import ProfileSearch from './ProfileSearch.vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const profileSearchDialog = ref(false)
const profileSearchLoading = ref(false)
const profileSearchResults: Ref<IProfile[]> = ref([])

const objectWithProfile = defineModel({
  required: true
})

const props = defineProps({
  profileSearchInput: {
    required: true,
    type: Object as () => IProfileSearch
  },
  label: {
    required: true,
    type: String
  },
  iconName: {
    required: false,
    type: String
  },
  required: {
    required: false,
    type: Boolean,
    default: false
  }
})

const profileSearchUpdate = (input: any) => {
  const profileSearch: IProfileSearch = {
    name: input
  }

  profileService.search(profileSearch).then((response) => {
    profileSearchResults.value = response
  })
}

const profileSelectedInProfileSearch = (profile: IProfile) => {
  objectWithProfile.value = profile.id
  profileSearchDialog.value = false
}
</script>

<template>
  <div class="d-flex">
    <div class="d-flex align-center me-2">
      <v-icon v-if="props.iconName">{{ props.iconName }}</v-icon>
    </div>
    <v-autocomplete
      :loading="profileSearchLoading"
      :label="props.label"
      :class="{ 'required-input': props.required }"
      variant="underlined"
      v-model="objectWithProfile"
      :items="profileSearchResults"
      @update:search="profileSearchUpdate"
      item-title="name"
      item-value="id"
    ></v-autocomplete>
    <div class="d-flex align-center" @click="profileSearchDialog = true">
      <v-icon>mdi-magnify</v-icon>
    </div>
  </div>

  <v-dialog v-model="profileSearchDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearch
        :profile-search-input="props.profileSearchInput"
        @close="profileSearchDialog = false"
        @profile-selected="(profile) => profileSelectedInProfileSearch(profile)"
      ></ProfileSearch>
    </v-card>
  </v-dialog>
</template>
