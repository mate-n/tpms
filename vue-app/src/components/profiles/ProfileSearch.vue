<script setup lang="ts">
import type { IProfilePostBody } from '@/interfaces/IProfilePostBody'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, ref, type Ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const emit = defineEmits(['close'])
const close = () => emit('close')
const profilePostBody: Ref<IProfilePostBody> = ref({
  name: '',
  firstName: '',
  email: '',
  city: ''
})

const foundProfiles: Ref<IProfile[]> = ref([])
const search = () => {
  profileService.search(profilePostBody.value).then((response) => {
    foundProfiles.value = response
  })
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Profile Search</v-toolbar-title>
    <div class="border-s h-100 d-flex px-3 align-center">
      <v-button>NEW PROFILE</v-button>
    </div>
    <div class="border-s h-100 d-flex px-5 align-center" @click="close()">
      <v-button><v-icon>mdi-close</v-icon></v-button>
    </div>
  </v-toolbar>
  <v-container fluid>
    <div class="d-flex">
      <v-text-field
        v-model="profilePostBody.name"
        label="Name"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profilePostBody.firstName"
        label="First Name"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profilePostBody.email"
        label="Email"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profilePostBody.city"
        label="City"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profilePostBody.profileId"
        label="Profile ID"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-btn class="bg-primary" @click="search()"><v-icon>mdi-magnify</v-icon>Search</v-btn>
    </div>
  </v-container>
  <v-container fluid v-if="foundProfiles.length > 0">
    <v-table>
      <thead class="text-uppercase">
        <tr>
          <th><v-icon>mdi-sort-variant</v-icon></th>
          <th>Last Name</th>
          <th>First Name</th>
          <th>Company</th>
          <th>Birthday</th>
          <th>Country</th>
          <th>Select</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profile in foundProfiles" :key="profile.lastName">
          <td>
            <div class="color-avatar-tertiary text-white">
              {{ profile.firstName.charAt(0) }}{{ profile.lastName.charAt(0) }}
            </div>
          </td>
          <td>{{ profile.lastName }}</td>
          <td>{{ profile.firstName }}</td>
          <td>{{ profile.company }}</td>
          <td>{{ profile.birthday }}</td>
          <td>{{ profile.country }}</td>
          <td><v-btn class="primary-button">Select</v-btn></td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
