<script setup lang="ts">
import { Profile } from '@/classes/Profile'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref, watch } from 'vue'
import ProfileAvatar from './ProfileAvatar.vue'
import ProfileContactDetailsCard from './ProfileContactDetailsCard.vue'
import ProfileAddressCard from './ProfileAddressCard.vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
import ProfilePersonalInfoCard from './ProfilePersonalInfoCard.vue'
import ProfileAdditionalInfoCard from './ProfileAdditionalInfoCard.vue'
import ProfileUserDefinedCard from './ProfileUserDefinedCard.vue'
import ProfilePreferencesCard from './ProfilePreferencesCard.vue'
import ProfileMarketingCard from './ProfileMarketingCard.vue'
import ProfileMembershipCardsCard from './ProfileMembershipCardsCard.vue'
import ProfileAttachmentsCard from './ProfileAttachmentsCard.vue'
import ProfileDocumentsCard from './ProfileDocumentsCard.vue'
import { LanguageService } from '@/services/LanguageService'
import type { ILanguage } from '@/interfaces/ILanguage'
import type { ISalutation } from '@/interfaces/ISalutation'
import { SalutationService } from '@/services/SalutationService'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const languageService = new LanguageService(axios)
const salutationService = new SalutationService(axios)
const cloneHelper = new CloneHelper()
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true },
  crudOperation: { type: Number, required: true }
})
const profileToBeEdited = ref<IProfile>(new Profile())
const emit = defineEmits(['save'])
const languages = ref(<ILanguage[]>[])
const salutations = ref(<ISalutation[]>[])
onMounted(() => {
  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
  salutationService.getAvailableSalutations().then((response) => {
    salutations.value = response
  })
  profileToBeEdited.value = cloneHelper.clone(props.profileInput)
})

watch(props, (newInput) => {
  profileToBeEdited.value = cloneHelper.clone(newInput.profileInput)
})

const save = () => {
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
</script>
<template>
  <v-container fluid class="bg-white">
    <v-row>
      <v-col cols="2">
        <div class="my-2">
          <ProfileAvatar
            v-model="profileToBeEdited"
            :crud-operation="crudOperation"
          ></ProfileAvatar>
        </div>
      </v-col>
      <v-col cols="10" class="border-s">
        <div class="d-flex">
          <div style="flex-grow: 6">
            <div class="d-flex big-vue-input-field-font-size">
              <v-text-field
                v-model="profileToBeEdited.lastName"
                label="Last Name"
                variant="underlined"
                class="me-3"
              ></v-text-field>
              <v-text-field
                v-model="profileToBeEdited.firstName"
                label="First Name"
                variant="underlined"
                class="me-3"
                aria-required="true"
              ></v-text-field>
              <v-text-field
                v-model="profileToBeEdited.middleName"
                label="Middle Name"
                variant="underlined"
                class="me-3"
              ></v-text-field>
            </div>
            <div class="d-flex">
              <v-autocomplete
                label="Salutaton"
                v-model="profileToBeEdited.salut"
                :items="salutations"
                item-title="value"
                variant="underlined"
                class="me-3"
              ></v-autocomplete>
              <v-text-field
                v-model="profileToBeEdited.salutShort"
                label="Personal Salutation"
                variant="underlined"
                class="me-3"
              ></v-text-field>
              <v-autocomplete
                label="Language"
                v-model="profileToBeEdited.language"
                :items="languages"
                item-title="value"
                variant="underlined"
                class="me-3"
              ></v-autocomplete>
              <v-autocomplete
                label="VIP"
                v-model="profileToBeEdited.vipCodeIDs"
                variant="underlined"
                class="me-3"
              ></v-autocomplete>
              <v-autocomplete
                label="Post Nominal Title"
                v-model="profileToBeEdited.postNominalTitle"
                variant="underlined"
              ></v-autocomplete>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
    <div class="h-100 d-flex px-5 align-center" @click="save()">
      <v-btn class="primary-button text-uppercase">{{ $t('actions.save') }}</v-btn>
    </div>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-calculator-variant-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-clipboard-text-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-account-multiple-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-bank-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-receipt-text-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-calendar-blank-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-security</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-account-check-outline</v-icon>
    </v-btn>
    <v-btn icon class="profiles-icon-button">
      <v-icon>mdi-paw</v-icon>
    </v-btn>
  </v-toolbar>
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <ProfileContactDetailsCard :profile="profileToBeEdited"></ProfileContactDetailsCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileAddressCard v-model="profileToBeEdited"></ProfileAddressCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfilePersonalInfoCard v-model="profileToBeEdited"></ProfilePersonalInfoCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileAdditionalInfoCard v-model="profileToBeEdited"></ProfileAdditionalInfoCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileUserDefinedCard v-model="profileToBeEdited"></ProfileUserDefinedCard>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col class="pr-0 profiles-card-column">
        <ProfilePreferencesCard v-model="profileToBeEdited"></ProfilePreferencesCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileMarketingCard v-model="profileToBeEdited"></ProfileMarketingCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileMembershipCardsCard v-model="profileToBeEdited"></ProfileMembershipCardsCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileDocumentsCard v-model="profileToBeEdited"></ProfileDocumentsCard>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <ProfileAttachmentsCard v-model="profileToBeEdited"></ProfileAttachmentsCard>
      </v-col>
    </v-row>
  </v-container>
</template>
