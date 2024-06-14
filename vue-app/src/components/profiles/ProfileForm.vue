<script setup lang="ts">
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import ProfileContactDetailsCard from './ProfileContactDetailsCard.vue'
import ProfileAddressCard from './ProfileAddressCard.vue'
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
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { ValidityHelper } from '@/helpers/ValidityHelper'
import StationeryCard from '../stationeries/StationeryCard.vue'
import ReservationsCard from '../reservations/ReservationsCard.vue'
import ProfileGeneralForm from './ProfileGeneralForm.vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
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

const validate = () => {
  profileValidator.validate(profileToBeEdited.value)
}

const save = () => {
  validate()
  if (profileToBeEdited.value.errors && Object.keys(profileToBeEdited.value.errors).length > 0) {
    return
  }
  if (props.crudOperation === CrudOperations.Create) {
    profileService.post(profileToBeEdited.value)
  } else if (props.crudOperation === CrudOperations.Update) {
    profileService.put(profileToBeEdited.value)
  }
  emit('save', profileToBeEdited.value)
}

const toggleActive = () => {
  profileToBeEdited.value.inactive = !profileToBeEdited.value.inactive
}

const stationeryCardDialog = ref(false)
const reservationsCardDialog = ref(false)
</script>
<template>
  <ProfileGeneralForm
    :crudOperation="crudOperation"
    v-model="profileToBeEdited"
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
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <ProfileContactDetailsCard :profile="profileToBeEdited"></ProfileContactDetailsCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileAddressCard :profile="profileToBeEdited"></ProfileAddressCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfilePersonalInfoCard v-model="profileToBeEdited"></ProfilePersonalInfoCard>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pr-0 profiles-card-column">
        <ProfileAdditionalInfoCard v-model="profileToBeEdited"></ProfileAdditionalInfoCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfilePreferencesCard v-model="profileToBeEdited"></ProfilePreferencesCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column"> </v-col>
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
