<script setup lang="ts">
import { Profile } from '@/classes/Profile'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)

const newProfile = ref<IProfile>(new Profile())
const save = () => {
  profileService.post(newProfile.value)
}

const toggleActive = () => {
  if (newProfile.value.activeStatus === 'ACTIVE') {
    newProfile.value.activeStatus = 'INACTIVE'
    return
  } else {
    newProfile.value.activeStatus = 'ACTIVE'
    return
  }
}
</script>
<template>
  <div class="d-flex">
    <div style="flex-grow: 1" class="d-flex align-center justify-center">
      <div>
        <div class="d-flex justify-center">
          <div>
            <div class="color-avatar-tertiary text-white">
              {{ newProfile.firstName.charAt(0) }}{{ newProfile.lastName.charAt(0) }}
            </div>
          </div>
        </div>
        <div>
          <div class="border rounded mt-3 px-1">PRIVATE</div>
        </div>
      </div>
    </div>
    <div style="flex-grow: 4">
      <div class="d-flex">
        <v-text-field
          v-model="newProfile.lastName"
          label="Last Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.firstName"
          label="First Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.middleName"
          label="Middle Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field
          v-model="newProfile.salutation"
          label="Salutation"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.personalSalutation"
          label="Personal Salutation"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.language"
          label="Language"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.vip"
          label="VIP"
          variant="underlined"
          class="me-3"
        ></v-text-field>
      </div>
    </div>
  </div>
  <v-toolbar>
    <div class="h-100 d-flex px-5 align-center me-auto" @click="toggleActive()">
      <template v-if="newProfile.activeStatus === 'ACTIVE'">
        <v-btn class="text-primary bg-white">
          <v-icon>mdi-check-circle-outline</v-icon> {{ $t('profile.active') }}</v-btn
        >
      </template>
      <template v-if="newProfile.activeStatus !== 'ACTIVE'">
        <v-btn class="text-primary bg-white">
          <v-icon>mdi-check-circle-outline</v-icon> {{ $t('profile.inactive') }}</v-btn
        >
      </template>
    </div>
    <div class="h-100 d-flex px-5 align-center" @click="save()">
      <v-btn class="primary-button text-uppercase">{{ $t('actions.save') }}</v-btn>
    </div>
  </v-toolbar>
</template>
