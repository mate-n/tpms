<script setup lang="ts">
import ProfileSearch from '@/components/profiles/ProfileSearch.vue'
import NewProfile from '@/components/profiles/NewProfile.vue'
import { ref, type Ref } from 'vue'
import { Profile } from '@/shared/classes/Profile'
import { ProfileSearchHelper } from '@/helpers/ProfileSearchHelper'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'
import { ProfileSearch as ProfileSearchClass } from '@/shared/classes/ProfileSearch'
const profileSearchHelper = new ProfileSearchHelper()
const newProfileDialog = ref(false)
const profileForNewProfile = ref(new Profile())
const profileSearch: Ref<IProfileSearch> = ref(new ProfileSearchClass())
const clickOnAdd = () => {
  profileForNewProfile.value = profileSearchHelper.convertToProfile(profileSearch.value)
  newProfileDialog.value = true
}
</script>

<template>
  <v-toolbar color="primary" title="Profiles">
    <v-btn class="primary-outline-add-button me-3" @click="clickOnAdd()"
      ><v-icon>mdi-plus</v-icon>Add</v-btn
    >
  </v-toolbar>
  <ProfileSearch @close="newProfileDialog = false" v-model="profileSearch"></ProfileSearch>
  <v-dialog v-model="newProfileDialog" fullscreen scrollable>
    <v-card>
      <NewProfile
        :profile-input="profileForNewProfile"
        @close="newProfileDialog = false"
      ></NewProfile>
    </v-card>
  </v-dialog>
</template>
