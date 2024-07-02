<script setup lang="ts">
import ProfileService from '@/services/ProfileService'
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import NewProfile from './NewProfile.vue'
import EditProfile from './EditProfile.vue'
import { GuestTypeService } from '@/services/GuestTypeService'
import { Profile } from '@/shared/classes/Profile'
import { ProfileSearch } from '@/shared/classes/ProfileSearch'
import type { IGuestType } from '@/shared/interfaces/IGuestType'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'
import { CloneHelper } from '@/helpers/CloneHelper'
import type { AxiosStatic } from 'axios'
import ProfileSearchVue from './ProfileSearch.vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const guestTypes: Ref<IGuestType[]> = ref([])
const guestTypeService = new GuestTypeService(axios)
const emit = defineEmits(['close', 'profileSelected'])
const close = () => emit('close')
const profileSearch: Ref<IProfileSearch> = ref(new ProfileSearch())
const profileFromInputFields = ref<IProfile>(new Profile())
const newProfileDialog = ref(false)
const editProfileDialog = ref(false)
const changeColumnsDialog = ref(false)
const cloneHelper = new CloneHelper()
const profileToBeEdited = ref<IProfile>(new Profile())
const foundProfiles: Ref<IProfile[]> = ref([])
const search = () => {
  profileService.findAll().then((response) => {
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
  if (profileSearch.value.name) profile.surname = profileSearch.value.name
  if (profileSearch.value.email) profile.email = profileSearch.value.email
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

onMounted(() => {
  guestTypeService.getAvailableGuestTypes().then((response) => {
    guestTypes.value = response
  })
})

const props = defineProps({
  profileSearchInput: { type: Object as () => IProfileSearch, required: false }
})

watch(
  props,
  (newInput) => {
    if (newInput.profileSearchInput) {
      profileSearch.value = cloneHelper.clone(newInput.profileSearchInput)
    }
  },
  { immediate: true }
)

const profileSelected = (profile: IProfile) => {
  emit('profileSelected', profile)
}
</script>

<style scoped>
.v-data-table :deep(.v-data-table__th) {
  background-color: #f8f8f8 !important;
}
</style>

<template>
  <v-toolbar class="bg-white">
    <v-toolbar-title>Profile Search</v-toolbar-title>
    <div class="profiles-card-toolbar-button" @click="openNewProfileDialog()">NEW PROFILE</div>
    <div class="profiles-card-toolbar-button" @click="close()">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="profiles-card-divider"></v-divider>

  <ProfileSearchVue @profile-selected="(profile) => profileSelected(profile)"></ProfileSearchVue>

  <v-dialog v-model="newProfileDialog" fullscreen scrollable>
    <v-card>
      <NewProfile
        :profile-input="profileFromInputFields"
        @close="closeNewProfileDialog()"
        @save="(profile) => profileSave(profile)"
      ></NewProfile>
    </v-card>
  </v-dialog>

  <v-dialog v-model="editProfileDialog" fullscreen scrollable>
    <v-card>
      <EditProfile
        :profile-input="profileToBeEdited"
        @update="() => profileUpdate()"
        @close="closeEditProfileDialog()"
      ></EditProfile>
    </v-card>
  </v-dialog>

  <v-dialog v-model="changeColumnsDialog" max-width="500" scrollable>
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
