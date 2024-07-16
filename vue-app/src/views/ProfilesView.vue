<script setup lang="ts">
import ProfileSearch from '@/components/profiles/ProfileSearch.vue'
import NewProfile from '@/components/profiles/NewProfile.vue'
import { ref, type Ref } from 'vue'
import { Profile } from '@/shared/classes/Profile'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
import { ProfileLookUpPostBodyHelper } from '@/helpers/ProfileLookUpPostBodyHelper'
const profileLookUpPostBodyHelper = new ProfileLookUpPostBodyHelper()
const newProfileDialog = ref(false)
const profileForNewProfile = ref(new Profile())
const profileLookUpPostBody: Ref<IProfileLookUpPostBody> = ref(new ProfileLookUpPostBody())
const clickOnAdd = () => {
  profileForNewProfile.value = profileLookUpPostBodyHelper.convertToProfile(
    profileLookUpPostBody.value
  )
  newProfileDialog.value = true
}
</script>

<template>
  <v-toolbar color="primary" title="Profiles">
    <v-btn class="primary-outline-add-button me-3" @click="clickOnAdd()"
      ><v-icon>mdi-plus</v-icon>Add</v-btn
    >
  </v-toolbar>
  <ProfileSearch
    @close="newProfileDialog = false"
    v-model="profileLookUpPostBody"
    :show-select-button="false"
  ></ProfileSearch>
  <v-dialog v-model="newProfileDialog" fullscreen scrollable>
    <v-card>
      <NewProfile
        :profile-input="profileForNewProfile"
        @close="newProfileDialog = false"
      ></NewProfile>
    </v-card>
  </v-dialog>
</template>
