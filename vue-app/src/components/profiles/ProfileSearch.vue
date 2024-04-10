<script setup lang="ts">
import type { IProfilePostBody } from '@/interfaces/IProfilePostBody'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, ref, type Ref } from 'vue'
import NewProfile from './NewProfile.vue'
import EditProfile from './EditProfile.vue'
import { Profile } from '@/classes/Profile'
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
const profileFromInputFields = ref<IProfile>(new Profile())
const newProfileDialog = ref(false)
const editProfileDialog = ref(false)
const selectProfile = (profile: IProfile) => {
  emit('profileSelected', profile)
}
const editProfile = (profile: IProfile) => {
  const newProfileToBeEdited = new Profile()
  newProfileToBeEdited.castToProfile(profile)
  profileToBeEdited.value = newProfileToBeEdited
  openEditProfileDialog()
}
const profileToBeEdited = ref<IProfile>(new Profile())
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

const openNewProfileDialog = () => {
  const profile = new Profile()
  if (profilePostBody.value.name) profile.lastName = profilePostBody.value.name
  if (profilePostBody.value.firstName) profile.firstName = profilePostBody.value.firstName
  if (profilePostBody.value.email) profile.email = profilePostBody.value.email
  if (profilePostBody.value.city) profile.city = profilePostBody.value.city
  profileFromInputFields.value = profile
  newProfileDialog.value = true
}

const closeNewProfileDialog = () => {
  newProfileDialog.value = false
}

const openEditProfileDialog = () => {
  editProfileDialog.value = true
}

const closeEditProfileDialog = () => {
  editProfileDialog.value = false
}

const profileSave = (profile: IProfile) => {
  profileToBeEdited.value = profile
  closeNewProfileDialog()
  openEditProfileDialog()
}

const profileUpdate = () => {
  search()
  closeEditProfileDialog()
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title>Profile Search</v-toolbar-title>
    <div class="border-s h-100 d-flex px-3 align-center">
      <v-btn @click="openNewProfileDialog()">NEW PROFILE</v-btn>
    </div>
    <div class="border-s h-100 d-flex px-5 align-center" @click="close()">
      <v-btn><v-icon>mdi-close</v-icon></v-btn>
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
      <v-btn class="primary-button" @click="search()"><v-icon>mdi-magnify</v-icon>Search</v-btn>
    </div>
  </v-container>
  <v-container fluid v-if="foundProfiles.length > 0">
    <v-data-table :headers="tableDataHeaders" :items="foundProfiles">
      <template v-slot:[`header.avatar`]="{ column }">
        {{ column.title }}
        <v-icon>mdi-sort-variant </v-icon>
      </template>
      <template :headers="tableDataHeaders" v-slot:[`header.dots-vertical`]="{ column }">
        {{ column.title }}
        <v-icon>mdi-cog</v-icon>
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
          <td @click="editProfile(row.item)">
            <v-icon>mdi-dots-vertical</v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
  <v-dialog v-model="newProfileDialog" fullscreen>
    <v-card>
      <NewProfile
        :profile-input="profileFromInputFields"
        @close="closeNewProfileDialog()"
        @save="(profile) => profileSave(profile)"
      ></NewProfile>
    </v-card>
  </v-dialog>

  <v-dialog v-model="editProfileDialog" fullscreen>
    <v-card>
      <EditProfile
        :profile-input="profileToBeEdited"
        @update="() => profileUpdate()"
        @close="closeEditProfileDialog()"
      ></EditProfile>
    </v-card>
  </v-dialog>
</template>
