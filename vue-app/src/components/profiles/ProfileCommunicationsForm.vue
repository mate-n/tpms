<script setup lang="ts">
import { inject, onBeforeMount, onMounted, ref, watch, type Ref } from 'vue'
import { ProfileCommunication } from '@/classes/ProfileCommunication'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import type { AxiosStatic } from 'axios'
import { ProfileCommunicationService } from '@/services/profiles/ProfileCommunicationService'
import ProfileCommunicationForm from './ProfileCommunicationForm.vue'
const emit = defineEmits(['close'])
const profileCommunications: Ref<IProfileCommunication[]> = ref([])
const props = defineProps({
  profile: { type: Object as () => IProfile, required: true }
})
watch(
  profileCommunications,
  () => {
    showSaveButton.value = true
  },
  { deep: true }
)
const showSaveButton = ref(false)
const addProfileCommunication = () => {
  profileCommunications.value.push(new ProfileCommunication())
}
const axios: AxiosStatic | undefined = inject('axios')
const profileCommunicationService = new ProfileCommunicationService(axios)

onBeforeMount(() => {
  reloadProfileCommunications()
})

const saveProfileCommunications = () => {
  const promisesToSaveProfileCommunications: Promise<void>[] = []

  profileCommunications.value.forEach((profileCommunication) => {
    if (profileCommunication.id) {
      const promiseToSaveProfileCommunication = new Promise<void>((innerResolve) => {
        profileCommunicationService.put(profileCommunication).then(() => {
          innerResolve()
        })
      })
      promisesToSaveProfileCommunications.push(promiseToSaveProfileCommunication)
    } else {
      const promiseToSaveProfileCommunication = new Promise<void>((innerResolve) => {
        profileCommunicationService.post(profileCommunication).then(() => {
          innerResolve()
        })
      })
      promisesToSaveProfileCommunications.push(promiseToSaveProfileCommunication)
    }
  })

  Promise.all(promisesToSaveProfileCommunications).then(() => {
    reloadProfileCommunications()
  })
}

const getProfileCommunications = () => {
  return new Promise<void>((resolve) => {
    if (props.profile.id) {
      profileCommunicationService.getAllOfProfile(props.profile.id).then((response) => {
        profileCommunications.value = response
        resolve()
      })
    } else {
      resolve()
    }
  })
}

const reloadProfileCommunications = () => {
  getProfileCommunications().then(() => {
    showSaveButton.value = false
  })
}

const deleteProfileCommunication = () => {
  reloadProfileCommunications()
}
</script>
<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title>Profile contact details </v-toolbar-title>
    <div
      v-if="showSaveButton"
      class="profiles-card-toolbar-button text-primary"
      @click="saveProfileCommunications()"
    >
      <v-icon size="large">mdi-content-save-outline</v-icon>
    </div>
    <div class="profiles-card-toolbar-button" @click="addProfileCommunication()">
      <v-icon size="large">mdi-plus</v-icon>ADD
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-container fluid class="profiles-card-container">
    <div
      v-for="(profileCommunication, index) in profileCommunications"
      :key="profileCommunication.id"
    >
      <div class="bg-white mb-2">
        <ProfileCommunicationForm
          v-model="profileCommunications[index]"
          @delete="deleteProfileCommunication()"
        ></ProfileCommunicationForm>
      </div>
    </div>
  </v-container>
</template>
