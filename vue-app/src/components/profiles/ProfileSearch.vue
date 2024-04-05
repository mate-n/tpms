<script setup lang="ts">
import type { IProfilePostBody } from '@/interfaces/IProfilePostBody'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, ref, type Ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const emit = defineEmits(['close', 'profileSelected'])
const close = () => emit('close')
const profilePostBody: Ref<IProfilePostBody> = ref({
  name: '',
  firstName: '',
  email: '',
  city: ''
})

const selectProfile = (profile: IProfile) => {
  console.log('selected profile', profile)
  emit('profileSelected', profile)
}

const foundProfiles: Ref<IProfile[]> = ref([])
const search = () => {
  profileService.search(profilePostBody.value).then((response) => {
    foundProfiles.value = response
  })
}
const tableDataHeaders = [
  { key: 'avatar', title: '' },
  { key: 'lastName', title: 'LAST NAME' },
  { key: 'firstName', title: 'FIRST NAME' },
  { key: 'company', title: 'COMPANY' },
  { key: 'birthday', title: 'BIRTHDAY' },
  { key: 'country', title: 'COUNTRY' },
  { key: 'select', title: 'SELECT' },
  { key: 'dots-vertical', title: '' }
]
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
    <v-data-table :headers="tableDataHeaders" :items="foundProfiles">
      <template v-slot:[`header.avatar`]="{ column }">
        {{ column.title }}
        <v-icon>mdi-sort-variant </v-icon>
      </template>
      <template v-slot:item="row">
        <tr>
          <td>
            <div class="color-avatar-tertiary text-white">
              {{ row.item.firstName.charAt(0) }}{{ row.item.lastName.charAt(0) }}
            </div>
          </td>
          <td>{{ row.item.lastName }}</td>
          <td>{{ row.item.firstName }}</td>
          <td>{{ row.item.company }}</td>
          <td>{{ row.item.birthday }}</td>
          <td>{{ row.item.country }}</td>
          <td>
            <v-btn class="primary-button" @click="selectProfile(row.item)">Select</v-btn>
          </td>
          <td>
            <v-icon>mdi-dots-vertical</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
