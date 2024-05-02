<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import ProfileAdditionalInfoForm from './ProfileAdditionalInfoForm.vue'

const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Additional Info</span></v-toolbar-title>
    </v-toolbar>
    <v-container>
      <ProfileAdditionalInfoForm v-model="profileToBeEdited"></ProfileAdditionalInfoForm>
    </v-container>
  </div>
</template>
