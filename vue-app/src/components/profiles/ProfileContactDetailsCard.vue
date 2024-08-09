<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { CommunicationMethodService } from '@/services/CommunicationMethodService'
import type { ICommunicationMethod } from '@/shared/interfaces/ICommunicationMethod'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { ProfileValidator } from '@/shared/validators/ProfileValidator'
const profileValidator = new ProfileValidator()
const axios2: AxiosStatic | undefined = inject('axios2')
const communicationMethodService = new CommunicationMethodService(axios2)
const communicationMethods = ref<ICommunicationMethod[]>([])
const profile = defineModel({ required: true, type: Object as () => IProfile })
const emit = defineEmits(['blur-email'])

const validate = () => {
  profileValidator.validate(profile.value)
}

onBeforeMount(() => {
  communicationMethodService.getAvailableCommunicationMethods().then((response) => {
    communicationMethods.value = response
  })
})

const getCommunicationMethodValue = (communicationMethodID: number | undefined) => {
  const communicationMethod = communicationMethods.value.find(
    (cm) => cm.id === communicationMethodID
  )
  return communicationMethod ? communicationMethod.value : ''
}

const blurEmail = () => {
  emit('blur-email')
}
</script>
<template>
  <div class="profiles-card" data-cy="profile_contact_detail_form">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Contact details</span></v-toolbar-title>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <v-text-field
        v-model="profile.email"
        label="e-Mail"
        variant="underlined"
        class="me-3 required-input"
        :error-messages="profile.errors && profile.errors['email']"
        @update:modelValue="validate()"
        @blur="blurEmail()"
        data-cy="email_field"
      ></v-text-field>
      <v-text-field
        v-model="profile.mobile"
        label="Mobile"
        variant="underlined"
        class="me-3 required-input"
        @update:modelValue="validate()"
        :error-messages="profile.errors && profile.errors['mobile']"
        data-cy="mobile_field"
      ></v-text-field>
      <div v-for="profileCommunication of profile.communications" :key="profileCommunication.id">
        <div class="mb-2">
          <span class="profile-card-caption">
            {{ getCommunicationMethodValue(profileCommunication.communicationTypeID) }}
            <br />
          </span>
          {{ profileCommunication.value }}
        </div>
      </div>
    </v-container>
  </div>
</template>
