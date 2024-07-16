<script setup lang="ts">
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import ProfileContactDetailsCard from './ProfileContactDetailsCard.vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
import ProfilePersonalInfoCard from './ProfilePersonalInfoCard.vue'
import ProfileAdditionalInfoCard from './ProfileAdditionalInfoCard.vue'
import ProfilePreferencesCard from './ProfilePreferencesCard.vue'
import { LanguageService } from '@/services/LanguageService'
import { SalutationService } from '@/services/SalutationService'
import { Profile } from '@/shared/classes/Profile'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import type { ISalutation } from '@/shared/interfaces/ISalutation'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { ProfileValidator } from '@/shared/validators/ProfileValidator'
import type { AxiosStatic } from 'axios'
import { ValidityHelper } from '@/helpers/ValidityHelper'
import StationeryCard from '../stationeries/StationeryCard.vue'
import ReservationsCard from '../reservations/ReservationsCard.vue'
import ProfileGeneralForm from './ProfileGeneralForm.vue'
import ProfileMembershipCardsCard from './ProfileMembershipCardsCard.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import { ProfileCreatePostBodyConverter } from '@/shared/converters/ProfileCreatePostBodyConverter'
import type { IProfileCreateResponseBody } from '@/shared/interfaces/profiles/IProfileCreateResponseBody'
import router from '@/router'
import type { ProfileLookUpPostBody } from '@/shared/classes/ProfileLookUpPostBody'
import ProfileAddressCard2 from './ProfileAddressCard2.vue'

const profileCreatePostBodyConverter = new ProfileCreatePostBodyConverter()
const axios: AxiosStatic | undefined = inject('axios')
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)
const profileValidator = new ProfileValidator()
const languageService = new LanguageService(axios)
const salutationService = new SalutationService(axios)
const cloneHelper = new CloneHelper()
const validityHelper = new ValidityHelper()
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true },
  crudOperation: { type: Number, required: true }
})
const profileToBeEdited = ref<IProfile>(new Profile())
const emit = defineEmits(['save'])
const languages: Ref<ILanguage[]> = ref([])
const salutations: Ref<ISalutation[]> = ref([])

onMounted(() => {
  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
  salutationService.getAvailableSalutations().then((response) => {
    salutations.value = response
  })
  profileToBeEdited.value = cloneHelper.clone(props.profileInput)
  validate()
})

watch(props, (newInput) => {
  profileToBeEdited.value = cloneHelper.clone(newInput.profileInput)
  validate()
})

const blurEmail = () => {
  if (props.crudOperation === CrudOperations.Create) {
    checkIfProfilesWithSameEmailExist(profileToBeEdited.value.email)
  }
}

const blurSaid = () => {
  if (props.crudOperation === CrudOperations.Create) {
    checkIfProfilesWithSAIDExist()
  }
}

const blurName = () => {
  if (props.crudOperation === CrudOperations.Create) {
    checkIfProfilesWithSameFirstAndLastNameExist()
  }
}

const validate = () => {
  profileValidator.validate(profileToBeEdited.value)
}

const save = () => {
  validate()
  if (profileToBeEdited.value.errors && Object.keys(profileToBeEdited.value.errors).length > 0) {
    return
  }
  if (props.crudOperation === CrudOperations.Create) {
    const profileCreatePostBody = profileCreatePostBodyConverter.convertToProfileCreatePostBody(
      profileToBeEdited.value
    )
    profileService
      .create(profileCreatePostBody)
      .then((profileCreateResponseBody: IProfileCreateResponseBody) => {
        router.push({
          name: 'edit profile',
          params: { profileID: profileCreateResponseBody.ProfileID }
        })
      })
  } else if (props.crudOperation === CrudOperations.Update) {
    const profileCreatePostBody = profileCreatePostBodyConverter.convertToProfileCreatePostBody(
      profileToBeEdited.value
    )
    profileService
      .create(profileCreatePostBody)
      .then((profileCreateResponseBody: IProfileCreateResponseBody) => {
        router.push({
          name: 'edit profile',
          params: { profileID: profileCreateResponseBody.ProfileID }
        })
      })
  }
  emit('save', profileToBeEdited.value)
}

const toggleActive = () => {
  profileToBeEdited.value.inactive = !profileToBeEdited.value.inactive
}

const stationeryCardDialog = ref(false)
const reservationsCardDialog = ref(false)

const profilesWithSameFirstAndLastName = ref<IProfile[]>([])
const checkIfProfilesWithSameFirstAndLastNameExist = async () => {
  if (profileToBeEdited.value.name.length < 3 || profileToBeEdited.value.surname.length < 3) {
    return
  }
  const profileLookUpPostBody: ProfileLookUpPostBody = {
    email: undefined,
    surname: profileToBeEdited.value.surname,
    name: profileToBeEdited.value.name,
    mobile: undefined,
    SAId: undefined,
    passportno: undefined,
    roomseekerclientcode: undefined,
    profileID: undefined,
    wildcardnumber: undefined,
    loyaltynumber: undefined
  }
  profileService.lookup(profileLookUpPostBody).then((response) => {
    profilesWithSameFirstAndLastName.value = response.slice(0, 3)
  })
}

const profilesWithSameSAID = ref<IProfile[]>([])
const checkIfProfilesWithSAIDExist = async () => {
  if (profileToBeEdited.value.SAId.length < 3) {
    return
  }
  const profileLookUpPostBody: ProfileLookUpPostBody = {
    email: undefined,
    surname: undefined,
    name: undefined,
    mobile: undefined,
    SAId: profileToBeEdited.value.SAId,
    passportno: undefined,
    roomseekerclientcode: undefined,
    profileID: undefined,
    wildcardnumber: undefined,
    loyaltynumber: undefined
  }
  profileService.lookup(profileLookUpPostBody).then((response) => {
    profilesWithSameSAID.value = response.slice(0, 3)
  })
}

const profilesWithSameEmail = ref<IProfile[]>([])
const checkIfProfilesWithSameEmailExist = async (email: string) => {
  if (email.length < 3) {
    return
  }
  const profileLookUpPostBody: ProfileLookUpPostBody = {
    email: email,
    surname: undefined,
    name: undefined,
    mobile: undefined,
    SAId: undefined,
    passportno: undefined,
    roomseekerclientcode: undefined,
    profileID: undefined,
    wildcardnumber: undefined,
    loyaltynumber: undefined
  }
  profileService.lookup(profileLookUpPostBody).then((response) => {
    profilesWithSameEmail.value = response.slice(0, 3)
  })
}

const goToProfile = (profileID: number | undefined) => {
  if (!profileID) {
    return
  }

  router.push({
    name: 'edit profile',
    params: { profileID: profileID }
  })
}
</script>
<template>
  <ProfileGeneralForm
    :crudOperation="crudOperation"
    v-model="profileToBeEdited"
    @blur-name="blurName()"
  ></ProfileGeneralForm>
  <v-toolbar class="bg-lightgray">
    <div class="h-100 d-flex px-5 align-center me-auto" @click="toggleActive()">
      <template v-if="!profileToBeEdited.inactive">
        <v-btn class="text-primary bg-white">
          <v-icon>mdi-check-circle-outline</v-icon> {{ $t('profile.active') }}</v-btn
        >
      </template>
      <template v-if="profileToBeEdited.inactive">
        <v-btn class="text-primary bg-white">
          <span class="text-danger"
            ><v-icon>mdi-account-off </v-icon> {{ $t('profile.inactive') }}</span
          ></v-btn
        >
      </template>
    </div>
    <div class="h-100 d-flex px-5 align-center">
      <v-btn
        v-if="validityHelper.isValid(profileToBeEdited)"
        class="primary-button text-uppercase"
        @click="save()"
        >{{ $t('actions.save') }}</v-btn
      >
    </div>
    <v-tooltip text="Stationery">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          class="profiles-icon-button"
          @click="stationeryCardDialog = true"
        >
          <v-icon>mdi-clipboard-text-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Reservations">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          icon
          class="profiles-icon-button"
          @click="reservationsCardDialog = true"
        >
          <v-icon>mdi-calendar-blank-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Privacy Settings">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button text-gray">
          <v-icon>mdi-security</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="New Reservation">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-account-check-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
  <div v-if="profilesWithSameEmail.length > 0" class="bg-lightgray">
    <div v-for="profile of profilesWithSameEmail" :key="profile.id">
      <v-alert type="warning" class="mt-2">
        {{ profile.email }} is already taken.
        <v-btn @click="goToProfile(profile.id)" class="ml-auto text-primary">Go to profile</v-btn>
      </v-alert>
    </div>
  </div>
  <div v-if="profilesWithSameSAID.length > 0" class="bg-lightgray">
    <div v-for="profile of profilesWithSameSAID" :key="profile.id">
      <v-alert type="warning" class="mt-2">
        A profile with {{ profile.SAId }} already exists.
        <v-btn @click="goToProfile(profile.id)" class="ml-auto text-primary">Go to profile</v-btn>
      </v-alert>
    </div>
  </div>
  <div v-if="profilesWithSameFirstAndLastName.length > 0" class="bg-lightgray">
    <div v-for="profile of profilesWithSameFirstAndLastName" :key="profile.id">
      <v-alert type="warning" class="mt-2 d-flex">
        A profile with {{ profile.name }} {{ profile.surname }} already exists.
        <v-btn @click="goToProfile(profile.id)" class="ml-auto text-primary">Go to profile</v-btn>
      </v-alert>
    </div>
  </div>

  <v-container fluid class="bg-lightgray pt-2">
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <ProfileContactDetailsCard
          v-model="profileToBeEdited"
          @blur-email="blurEmail()"
        ></ProfileContactDetailsCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileAddressCard2 v-model="profileToBeEdited"></ProfileAddressCard2>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfilePersonalInfoCard
          v-model="profileToBeEdited"
          @blur-said="blurSaid()"
        ></ProfilePersonalInfoCard>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pr-0 profiles-card-column">
        <ProfileAdditionalInfoCard v-model="profileToBeEdited"></ProfileAdditionalInfoCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfilePreferencesCard v-model="profileToBeEdited"></ProfilePreferencesCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileMembershipCardsCard v-model="profileToBeEdited"></ProfileMembershipCardsCard>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="stationeryCardDialog" scrollable>
    <v-card>
      <StationeryCard @close="stationeryCardDialog = false" />
    </v-card>
  </v-dialog>

  <v-dialog v-model="reservationsCardDialog" scrollable>
    <v-card>
      <ReservationsCard @close="reservationsCardDialog = false" />
    </v-card>
  </v-dialog>
</template>
