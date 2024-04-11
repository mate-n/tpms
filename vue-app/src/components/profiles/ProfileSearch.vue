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
const changeColumnsDialog = ref(false)
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

const availableTableDataHeaders = ref([
  { key: 'avatar', title: '', selected: true },
  { key: 'lastName', title: 'LAST NAME', selected: true },
  { key: 'firstName', title: 'FIRST NAME', selected: true },
  { key: 'company', title: 'COMPANY', selected: true },
  { key: 'birthday', title: 'BIRTHDAY', selected: true },
  { key: 'country', title: 'COUNTRY', selected: true },
  { key: 'language', title: 'LANGUAGE', selected: false },
  { key: 'select', title: 'SELECT', selected: true },
  { key: 'menu', title: '', selected: true }
])

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
    <v-data-table
      :headers="availableTableDataHeaders.filter((h) => h.selected)"
      :items="foundProfiles"
    >
      <template v-slot:[`header.avatar`]="{ column }">
        {{ column.title }}
        <v-icon>mdi-sort-variant </v-icon>
      </template>
      <template v-slot:[`header.menu`]="{ column }">
        {{ column.title }}
        <v-icon @click="changeColumnsDialog = true">mdi-cog-outline</v-icon>
      </template>
      <template v-slot:item="row">
        <tr>
          <td
            v-for="header in availableTableDataHeaders.filter((h) => h.selected)"
            :key="header.key"
          >
            <div v-if="row.item.hasOwnProperty(header.key)">
              {{ row.item[header.key as keyof IProfile] }}
            </div>

            <div v-if="header.key === 'avatar'">
              <div class="color-avatar-tertiary-10 text-white">
                {{ row.item.firstName.charAt(0) }}{{ row.item.lastName.charAt(0) }}
              </div>
            </div>

            <div v-if="header.key === 'select'">
              <v-btn class="primary-button" @click="selectProfile(row.item)">Select</v-btn>
            </div>

            <div v-if="header.key === 'menu'">
              <v-icon @click="editProfile(row.item)">mdi-dots-vertical</v-icon>
            </div>
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

  <v-dialog v-model="changeColumnsDialog" max-width="500">
    <v-card>
      <v-toolbar class="bg-white elevation-3">
        <v-toolbar-title>Columns</v-toolbar-title>
        <div class="border-s h-100 d-flex px-5 align-center" @click="changeColumnsDialog = false">
          <v-btn><v-icon>mdi-close</v-icon></v-btn>
        </div>
      </v-toolbar>
      <v-container>
        <div style="height: 3rem" v-for="header in availableTableDataHeaders" :key="header.key">
          <v-checkbox :label="header.key" v-model="header.selected"></v-checkbox>
        </div>
      </v-container>
    </v-card>
  </v-dialog>
</template>
