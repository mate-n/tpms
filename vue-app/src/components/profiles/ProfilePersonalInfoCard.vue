<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import ProfilePersonalInfoForm from './ProfilePersonalInfoForm.vue'

const emit = defineEmits(['blur-said'])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

const blurSaid = () => {
  emit('blur-said')
}
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Personal Info</span></v-toolbar-title>
    </v-toolbar>
    <v-container>
      <ProfilePersonalInfoForm
        v-model="profileToBeEdited"
        @blur-said="blurSaid()"
      ></ProfilePersonalInfoForm>
    </v-container>
  </div>
</template>
