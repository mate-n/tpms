<script setup lang="ts">
import ProfilePersonalInfoForm from './ProfilePersonalInfoForm.vue'
import type { IProfile } from '@/interfaces/profiles/IProfile'

const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Personal Info</span></v-toolbar-title>
    </v-toolbar>
    <v-container>
      <ProfilePersonalInfoForm v-model="profileToBeEdited"></ProfilePersonalInfoForm>
    </v-container>
  </div>
</template>
