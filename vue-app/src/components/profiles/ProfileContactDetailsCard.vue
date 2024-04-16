<script setup lang="ts">
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { inject, onMounted, ref } from 'vue'
import ProfileContactDetailsForm from './ProfileContactDetailsForm.vue'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import { CommunicationTypes } from '@/enums/CommunicationTypes'
import ProfileCommunicationService from '@/services/profiles/ProfileCommunicationService'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const profileCommunicationService = new ProfileCommunicationService(axios)
const editProfileContactDetailsDialog = ref(false)
const profileToBeEdited = defineModel({ required: true, type: Object as () => IProfile })
const profileCommunications = ref<IProfileCommunication[]>([])

onMounted(() => {
  profileCommunicationService.search({ ids: [1, 2, 3] }).then((response) => {
    profileCommunications.value = response
  })
})
</script>
<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Contact details</span></v-toolbar-title>
      <v-btn icon @click="editProfileContactDetailsDialog = true">
        <v-icon class="text-gray">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div v-for="profileCommunication of profileCommunications" :key="profileCommunication.id">
        <div class="mb-2">
          <span class="profile-card-caption">
            {{ CommunicationTypes[profileCommunication.communicationTypeID] }}<br />
          </span>
          {{ profileCommunication.value }}
        </div>
      </div>
    </v-container>
    <v-dialog v-model="editProfileContactDetailsDialog" fullscreen>
      <ProfileContactDetailsForm v-model="profileToBeEdited"></ProfileContactDetailsForm>
    </v-dialog>
  </div>
</template>
