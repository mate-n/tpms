<script setup lang="ts">
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { ref } from 'vue'
import ProfileContactDetailsForm from './ProfileContactDetailsForm.vue'
const editProfileContactDetailsDialog = ref(false)
const profileToBeEdited = defineModel({ required: true, type: Object as () => IProfile })
</script>
<template>
  <v-toolbar class="bg-white elevation-1">
    <v-toolbar-title><span class="text-primary">Contact details</span></v-toolbar-title>
    <v-btn icon @click="editProfileContactDetailsDialog = true">
      <v-icon class="text-gray">mdi-pencil-outline</v-icon>
    </v-btn>
  </v-toolbar>
  <v-divider></v-divider>
  <v-card>
    <template v-slot:text>
      <div class="mb-2">
        Mobile<br />
        123456789
      </div>
      <div>
        E-Mail<br />
        max.mustermann@mail.com
      </div>
    </template>
  </v-card>
  <v-dialog v-model="editProfileContactDetailsDialog" fullscreen>
    <ProfileContactDetailsForm v-model="profileToBeEdited"></ProfileContactDetailsForm>
  </v-dialog>
</template>
