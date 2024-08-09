<script setup lang="ts">
import { GenderService } from '@/services/GenderService'
import { NationalityService } from '@/services/NationalityService'
import { CountryService } from '@/services/CountryService'
import { onMounted, ref } from 'vue'
import type { ICountry } from '@/shared/interfaces/ICountry'
import type { IGender } from '@/shared/interfaces/IGender'
import type { INationality } from '@/shared/interfaces/INationality'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import DateSelecter from '../dates/DateSelecter.vue'
import { ProfileValidator } from '@/shared/validators/ProfileValidator'
import { SAIDPassportHelper } from '@/helpers/SAIDPassportHelper'
const profileValidator = new ProfileValidator()
const axios2: AxiosStatic | undefined = inject('axios2')
const genderService = new GenderService(axios2)
const nationalityService = new NationalityService(axios2)
const countryService = new CountryService(axios2)
const availableGenders = ref<IGender[]>([])
const availableNationalities = ref<INationality[]>([])
const availableCountries = ref<ICountry[]>([])
const sAIDPassportHelper = new SAIDPassportHelper()
const emit = defineEmits(['blur-said'])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

const validate = () => {
  profileValidator.validate(profileToBeEdited.value)
}

onMounted(() => {
  genderService.getAvailableGenders().then((response) => {
    availableGenders.value = response
  })

  nationalityService.getAvailableNationalities().then((response) => {
    availableNationalities.value = response
  })

  countryService.getAvailableCountries().then((response) => {
    availableCountries.value = response
  })
})

const dateofbirthUpdated = () => {
  validate()
}

const saidChange = () => {
  if (!profileToBeEdited.value.dateofbirth) {
    const newDateOfBirth = sAIDPassportHelper.extractBirthdateFromSAIDNumber(
      profileToBeEdited.value.SAId
    )
    if (newDateOfBirth) {
      profileToBeEdited.value.dateofbirth = newDateOfBirth
    }
  }

  if (!profileToBeEdited.value.gender) {
    const newGender = sAIDPassportHelper.extractGenderFromSAIDNumber(profileToBeEdited.value.SAId)
    if (newGender) {
      profileToBeEdited.value.gender = newGender
    }
  }

  if (!profileToBeEdited.value.countryofbirth) {
    profileToBeEdited.value.countryofbirth = 'ZA'
  }

  validate()
}

const saidBlur = () => {
  emit('blur-said')
}
</script>

<template>
  <DateSelecter
    v-model="profileToBeEdited.dateofbirth"
    :error-message="profileToBeEdited.errors && profileToBeEdited.errors['dateofbirth']"
    label="Date of Birth"
    @update:model-value="dateofbirthUpdated"
    data-cy="date_of_birth_field"
  ></DateSelecter>

  <v-select
    v-model="profileToBeEdited.gender"
    label="Gender"
    variant="underlined"
    :v-model="profileToBeEdited.gender"
    :items="availableGenders"
    item-title="value"
  ></v-select>
  <v-select
    v-model="profileToBeEdited.countryofbirth"
    label="Nationality"
    variant="underlined"
    :v-model="profileToBeEdited.countryofbirth"
    :error-messages="profileToBeEdited.errors && profileToBeEdited.errors['countryofbirth']"
    @update:modelValue="validate()"
    :items="availableNationalities"
    item-title="value"
    item-value="id"
    data-cy="nationality_field"
  ></v-select>

  <v-row>
    <v-col>
      <v-text-field
        label="SA ID Number"
        v-model="profileToBeEdited.SAId"
        variant="underlined"
        :error-messages="profileToBeEdited.errors && profileToBeEdited.errors['sAId']"
        @update:modelValue="saidChange()"
        @blur="saidBlur()"
        data-cy="sa_id_number_field"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.passportno"
        label="Passport Number"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
