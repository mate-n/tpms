<script setup lang="ts">
import ProfileService from '@/services/ProfileService'
import { onMounted, ref, watch, type Ref } from 'vue'
import NewProfile from './NewProfile.vue'
import EditProfile from './EditProfile.vue'
import { GuestTypeService } from '@/services/GuestTypeService'
import { DateFormatter } from '@/helpers/DateFormatter'
import { Profile } from '@/shared/classes/Profile'
import { ProfileSearch } from '@/shared/classes/ProfileSearch'
import type { IGuestType } from '@/shared/interfaces/IGuestType'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'
import { CloneHelper } from '@/helpers/CloneHelper'
const dateFormatter = new DateFormatter()
const profileService = new ProfileService()
const guestTypes: Ref<IGuestType[]> = ref([])
const guestTypeService = new GuestTypeService()
const emit = defineEmits(['close', 'profileSelected'])
const close = () => emit('close')
const profileSearch: Ref<IProfileSearch> = ref(new ProfileSearch())
const profileFromInputFields = ref<IProfile>(new Profile())
const newProfileDialog = ref(false)
const editProfileDialog = ref(false)
const changeColumnsDialog = ref(false)
const cloneHelper = new CloneHelper()
const selectProfile = (profile: IProfile) => {
  emit('profileSelected', profile)
}
const editProfile = (profile: IProfile) => {
  let newProfileToBeEdited = new Profile()
  newProfileToBeEdited = Object.assign(newProfileToBeEdited, profile)
  profileToBeEdited.value = newProfileToBeEdited
  openEditProfileDialog()
}
const profileToBeEdited = ref<IProfile>(new Profile())
const foundProfiles: Ref<IProfile[]> = ref([])
const search = () => {
  profileService.search(profileSearch.value).then((response) => {
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
  if (profileSearch.value.name) profile.lastName = profileSearch.value.name
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

  <v-container class="bg-white" fluid>
    <div class="d-flex">
      <v-text-field
        v-model="profileSearch.name"
        label="Name"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profileSearch.email"
        label="Email"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profileSearch.city"
        label="City"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profileSearch.profileID"
        label="Profile ID"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-autocomplete
        label="Type"
        v-model="profileSearch.guestTypeID"
        :items="guestTypes"
        item-title="value"
        item-value="id"
        variant="underlined"
        class="me-3"
      ></v-autocomplete>
      <v-btn class="primary-button" @click="search()"><v-icon>mdi-magnify</v-icon>Search</v-btn>
    </div>
  </v-container>
  <v-container fluid v-if="foundProfiles.length > 0" class="bg-white px-0">
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
        <v-btn icon variant="text">
          <v-icon @click="changeColumnsDialog = true">mdi-cog-outline</v-icon>
        </v-btn>
      </template>
      <template v-slot:item="row">
        <tr>
          <td
            v-for="header in availableTableDataHeaders.filter((h) => h.selected)"
            :key="header.key"
          >
            <div v-if="row.item.hasOwnProperty(header.key)">
              <template v-if="header.key === 'birthday'">
                {{ dateFormatter.dddotmmdotyyyy(row.item['birthday']) }}
              </template>

              <template v-if="header.key !== 'birthday'">
                {{ row.item[header.key as keyof IProfile] }}
              </template>
            </div>

            <div v-if="header.key === 'avatar'">
              <div class="color-avatar-tertiary-10 text-white">
                {{ row.item.firstName.charAt(0) }}{{ row.item.lastName.charAt(0) }}
              </div>
            </div>

            <div v-if="header.key === 'select'">
              <v-btn class="primary-button" size="small" @click="selectProfile(row.item)"
                >Select</v-btn
              >
            </div>

            <div v-if="header.key === 'menu'">
              <v-btn icon variant="text">
                <v-icon @click="editProfile(row.item)">mdi-dots-vertical</v-icon>
              </v-btn>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
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
