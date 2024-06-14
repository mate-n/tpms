<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import ProfileMembershipForm from '@/components/profiles/ProfileMembershipForm.vue'
import type { IProfileMembershipCard } from '@/shared/interfaces/profiles/IProfileMembershipCard'
import { ProfileMembershipCard } from '@/shared/classes/ProfileMembership'
const axios: AxiosStatic | undefined = inject('axios')
const emit = defineEmits(['close'])
const profile = defineModel({ required: true, type: Object as () => IProfile })

watch(
  profile.value.membershipCards,
  () => {
    showSaveButton.value = true
  },
  { deep: true }
)
const showSaveButton = ref(false)
const addMembership = () => {
  profile.value.membershipCards.push(new ProfileMembershipCard())
}
</script>
<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title> Profile Memberships</v-toolbar-title>
    <div v-if="showSaveButton" class="profiles-card-toolbar-button text-primary">
      <v-icon size="large">mdi-content-save-outline</v-icon>
    </div>
    <div class="profiles-card-toolbar-button" @click="addMembership()">
      <v-icon size="large">mdi-plus</v-icon>ADD
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-container fluid class="profiles-card-container d-flex flex-wrap">
    <div
      v-for="(profileMembership, index) in profile.membershipCards"
      :key="profileMembership.membershipName"
    >
      <div class="bg-white mb-2 me-1 mb-1" style="min-width: 25rem">
        <ProfileMembershipForm
          v-model="profile.membershipCards[index]"
          :indexOfMembership="index"
        ></ProfileMembershipForm>
      </div>
    </div>
  </v-container>
</template>
