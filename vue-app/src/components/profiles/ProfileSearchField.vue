<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { AxiosStatic } from 'axios'
import { inject, ref, type Ref } from 'vue'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
import ProfileSearchCard from './ProfileSearchCard.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const profileSearchDialog = ref(false)
const profileSearchLoading = ref(false)
const profileSearchResults: Ref<IProfile[]> = ref([])

const profileID = defineModel({
  type: Number,
  required: false
})

const profileLookUpPostBody: Ref<IProfileLookUpPostBody> = ref(new ProfileLookUpPostBody())

const props = defineProps({
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

const profileSearchUpdate = (searchString: string) => {
  profileLookUpPostBody.value.surname = searchString
  profileService.lookup(profileLookUpPostBody.value).then((response) => {
    profileSearchResults.value = response
  })
}

const profileSelectedInProfileSearch = (profile: IProfile) => {
  profileSearchResults.value = [profile]
  profileID.value = profile.profileID
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
      v-model="profileID"
      :items="profileSearchResults"
      @update:search="profileSearchUpdate"
      :item-title="(profile: IProfile) => `${profile.surname}`"
      item-value="profileID"
    ></v-autocomplete>
    <div class="d-flex align-center" @click="profileSearchDialog = true">
      <v-icon>mdi-magnify</v-icon>
    </div>
  </div>

  <v-dialog v-model="profileSearchDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearchCard
        :profile-look-up-post-body-input="profileLookUpPostBody"
        @close="profileSearchDialog = false"
        @profile-selected="(profile) => profileSelectedInProfileSearch(profile)"
      ></ProfileSearchCard>
    </v-card>
  </v-dialog>
</template>
