<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { ProfileCommunicationService } from '@/services/profiles/ProfileCommunicationService'
import ProfileCommunicationForm from './ProfileCommunicationForm.vue'
import { IdentityHelper } from '@/helpers/IdentityHelper'
import type { IProfileCommunication } from '@/shared/interfaces/profiles/IProfileCommunication'
import { ProfileCommunication } from '@/shared/classes/ProfileCommunication'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { ValidityHelper } from '@/helpers/ValidityHelper'
const validityHelper = new ValidityHelper()
const axios: AxiosStatic | undefined = inject('axios')
const identityHelper = new IdentityHelper()
const emit = defineEmits(['close'])
const profile = defineModel({ required: true, type: Object as () => IProfile })

watch(
  profile.value.communications,
  () => {
    showSaveButton.value = areAllProfileCommunicationsAreValid()
  },
  { deep: true }
)
const showSaveButton = ref(false)
const areAllProfileCommunicationsAreValid = () => {
  return profile.value.communications.every((profileCommunication) =>
    validityHelper.isValid(profileCommunication)
  )
}
const addProfileCommunication = () => {
  profile.value.communications.push(new ProfileCommunication())
}
const profileCommunicationService = new ProfileCommunicationService(axios)

onBeforeMount(() => {
  reloadProfileCommunications()
})

const saveProfileCommunications = () => {
  const promisesToSaveProfileCommunications: Promise<void>[] = []

  profile.value.communications.forEach((profileCommunication) => {
    const promiseToSaveProfileCommunication = new Promise<void>((innerResolve) => {
      profileCommunicationService.createOrUpdate(profileCommunication).then(() => {
        innerResolve()
      })
    })
    promisesToSaveProfileCommunications.push(promiseToSaveProfileCommunication)
  })

  Promise.all(promisesToSaveProfileCommunications).then(() => {
    reloadProfileCommunications()
  })
}

const reloadProfileCommunications = () => {
  showSaveButton.value = false
}

const deleteProfileCommunication = (profileCommunication: IProfileCommunication) => {
  profileCommunicationService.delete(profileCommunication)

  profile.value.communications = profile.value.communications.filter(
    (innerProfileCommunication) =>
      !identityHelper.isSame(innerProfileCommunication, profileCommunication)
  )
}

const changeCommunicationType = (profileCommunication: IProfileCommunication) => {
  const foundProfileCommunicationWithSameType = profile.value.communications.filter(
    (innerProfileCommunication) =>
      innerProfileCommunication.communicationTypeID === profileCommunication.communicationTypeID
  )

  if (foundProfileCommunicationWithSameType.length === 1) {
    profileCommunication.primary = true
  }
}

const changePrimary = (profileCommunication: IProfileCommunication) => {
  const foundProfileCommunicationWithSameType = profile.value.communications.filter(
    (innerProfileCommunication) =>
      innerProfileCommunication.communicationTypeID === profileCommunication.communicationTypeID
  )
  for (const innerProfileCommunication of foundProfileCommunicationWithSameType) {
    innerProfileCommunication.primary = false
  }
  profileCommunication.primary = true
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
      v-for="(profileCommunication, index) in profile.communications"
      :key="profileCommunication.id"
    >
      <div class="bg-white mb-2">
        <ProfileCommunicationForm
          v-model="profile.communications[index]"
          @change-communication-type="
            (profileCommunication) => changeCommunicationType(profileCommunication)
          "
          @change-primary="(profileCommunication) => changePrimary(profileCommunication)"
          @delete="(profileCOmmunication) => deleteProfileCommunication(profileCommunication)"
        ></ProfileCommunicationForm>
      </div>
    </div>
  </v-container>
</template>
