<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from 'vue'
import NewProfile from './NewProfile.vue'
import { GuestTypeService } from '@/services/GuestTypeService'
import { Profile } from '@/shared/classes/Profile'
import type { IGuestType } from '@/shared/interfaces/IGuestType'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { AxiosStatic } from 'axios'
import ProfileDataTable from './ProfileDataTable.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IProfileLookUpPostBody } from '@/shared/interfaces/profiles/IProfileLookUpPostBody'
import { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
const axios: AxiosStatic | undefined = inject('axios')
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const guestTypes: Ref<IGuestType[]> = ref([])
const guestTypeService = new GuestTypeService(axios)
const profileFromInputFields = ref<IProfile>(new Profile())
const newProfileDialog = ref(false)
const editProfileDialog = ref(false)
const emit = defineEmits(['close', 'profileSelected'])
const selectProfile = (profile: IProfile) => {
  emit('profileSelected', profile)
}
const profileToBeEdited = ref<IProfile>(new Profile())
const foundProfiles: Ref<IProfile[]> = ref([])
const search = () => {
  profilesLoading.value = true
  if (profileLookUpPostBody.value) {
    profileService.lookup(profileLookUpPostBody.value).then((response) => {
      profilesLoading.value = false
      foundProfiles.value = response
    })
  } else {
    profileService.getAll().then((response) => {
      profilesLoading.value = false
      foundProfiles.value = response
    })
  }
}

const closeNewProfileDialog = () => {
  newProfileDialog.value = false
}

const openEditProfileDialog = () => {
  editProfileDialog.value = true
}

const profileSave = (profile: IProfile) => {
  profileToBeEdited.value = profile
  closeNewProfileDialog()
  openEditProfileDialog()
}

onMounted(() => {
  guestTypeService.getAvailableGuestTypes().then((response) => {
    guestTypes.value = response
  })

  if (profileLookUpPostBody.value === undefined) {
    profileLookUpPostBody.value = new ProfileLookUpPostBody()
  }
})

const profileLookUpPostBody = defineModel({
  required: false,
  type: Object as () => IProfileLookUpPostBody
})

const profilesLoading = ref(false)
</script>

<style scoped>
.v-data-table :deep(.v-data-table__th) {
  background-color: #f8f8f8 !important;
}
</style>

<template>
  <v-container class="bg-white" fluid v-if="profileLookUpPostBody">
    <div class="d-flex">
      <div class="flex-grow-1 flex-shrink-0">
        <div class="d-flex">
          <v-text-field
            v-model="profileLookUpPostBody.surname"
            label="Last Name"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.name"
            label="First Name"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.email"
            label="Email"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.mobile"
            label="Mobile"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.sAID"
            label="SA ID Number"
            variant="underlined"
            class="me-3"
          ></v-text-field>
        </div>
        <div class="d-flex">
          <v-text-field
            v-model="profileLookUpPostBody.passportno"
            label="Passport Number"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.roomseekerclientcode"
            label="RoomSeeker Client Code"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.tpmsProfileID"
            label="TPMS Profile ID"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.loyaltynumber"
            label="Loyalty Membership Number"
            variant="underlined"
            class="me-3"
          ></v-text-field>
          <v-text-field
            v-model="profileLookUpPostBody.wildcardnumber"
            label="Wildcard Membership Number"
            variant="underlined"
            class="me-3"
          ></v-text-field>
        </div>
      </div>
      <div class="d-flex flex-grow-0 flex-shrink-1">
        <v-btn class="primary-button" @click="search()"><v-icon>mdi-magnify</v-icon>Search</v-btn>
      </div>
    </div>
  </v-container>
  <v-progress-linear v-if="profilesLoading" color="primary" indeterminate></v-progress-linear>

  <ProfileDataTable
    :profiles="foundProfiles"
    @profile-selected="(profile) => selectProfile(profile)"
    @profile-updated="search()"
  ></ProfileDataTable>

  <v-dialog v-model="newProfileDialog" fullscreen scrollable>
    <v-card>
      <NewProfile
        :profile-input="profileFromInputFields"
        @close="closeNewProfileDialog()"
        @save="(profile) => profileSave(profile)"
      ></NewProfile>
    </v-card>
  </v-dialog>
</template>
