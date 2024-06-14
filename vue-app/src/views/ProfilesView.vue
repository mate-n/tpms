<script setup lang="ts">
import ProfileSearch from '@/components/profiles/ProfileSearch.vue'
import NewProfile from '@/components/profiles/NewProfile.vue'
import { ref } from 'vue'
import { Profile } from '@/shared/classes/Profile'
const newProfileDialog = ref(false)
const profileFromInputFields = ref(new Profile())
const clickOnAdd = () => {
  newProfileDialog.value = true
}
</script>

<template>
  <v-toolbar color="primary" title="Profiles">
    <v-btn class="primary-outline-add-button me-3" @click="clickOnAdd()"
      ><v-icon>mdi-plus</v-icon>Add</v-btn
    >
  </v-toolbar>
  <ProfileSearch @close="newProfileDialog = false"></ProfileSearch>
  <v-dialog v-model="newProfileDialog" fullscreen scrollable>
    <v-card>
      <NewProfile
        :profile-input="profileFromInputFields"
        @close="newProfileDialog = false"
      ></NewProfile>
    </v-card>
  </v-dialog>
</template>
