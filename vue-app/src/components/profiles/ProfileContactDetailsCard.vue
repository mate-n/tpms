<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { ProfileCommunicationService } from '@/services/profiles/ProfileCommunicationService'
import ProfileCommunicationsForm from './ProfileCommunicationsForm.vue'
import { CommunicationMethodService } from '@/services/CommunicationMethodService'
import type { ICommunicationMethod } from '@/shared/interfaces/ICommunicationMethod'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileCommunication } from '@/shared/interfaces/profiles/IProfileCommunication'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const profileCommunicationService = new ProfileCommunicationService(axios)
const communicationMethodService = new CommunicationMethodService(axios)
const communicationMethods = ref<ICommunicationMethod[]>([])
const editProfileContactDetailsDialog = ref(false)
const profileCommunications = ref<IProfileCommunication[]>([])
const props = defineProps({
  profile: { type: Object as () => IProfile, required: true }
})

onBeforeMount(() => {
  communicationMethodService.getAvailableCommunicationMethods().then((response) => {
    communicationMethods.value = response
  })
})

watch(props, () => {
  if (props.profile.id) {
    profileCommunicationService.getAllByProfileID(props.profile.id).then((response) => {
      profileCommunications.value = response
    })
  }
})

const getCommunicationMethodValue = (communicationMethodID: number | undefined) => {
  const communicationMethod = communicationMethods.value.find(
    (cm) => cm.id === communicationMethodID
  )
  return communicationMethod ? communicationMethod.value : ''
}
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
            {{ getCommunicationMethodValue(profileCommunication.communicationTypeID) }}
            <br />
          </span>
          {{ profileCommunication.value }}
        </div>
      </div>
    </v-container>
    <v-dialog v-model="editProfileContactDetailsDialog" scrollable auto>
      <v-card>
        <ProfileCommunicationsForm
          :profile="profile"
          @close="editProfileContactDetailsDialog = false"
        ></ProfileCommunicationsForm>
      </v-card>
    </v-dialog>
  </div>
</template>
