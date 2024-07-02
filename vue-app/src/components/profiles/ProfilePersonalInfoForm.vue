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
const axios: AxiosStatic | undefined = inject('axios')
const genderService = new GenderService(axios)
const nationalityService = new NationalityService(axios)
const countryService = new CountryService(axios)
const availableGenders = ref<IGender[]>([])
const availableNationalities = ref<INationality[]>([])
const availableCountries = ref<ICountry[]>([])
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

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
</script>

<template>
  <v-row>
    <v-col>
      <DateSelecter
        v-model="profileToBeEdited.dateofbirth"
        label="Date of Birth"
        :errors="profileToBeEdited.errors && profileToBeEdited.errors['dateofbirth']"
      ></DateSelecter>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.birthPlace"
        label="Place of Birth"
        variant="underlined"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-select
    v-model="profileToBeEdited.gender"
    label="Gender"
    variant="underlined"
    :v-model="profileToBeEdited.gender"
    :items="availableGenders"
    item-title="value"
  ></v-select>
  <v-select
    v-model="profileToBeEdited.nationality"
    label="Nationality"
    variant="underlined"
    :v-model="profileToBeEdited.nationality"
    :items="availableNationalities"
    item-title="value"
  ></v-select>
  <v-select
    v-model="profileToBeEdited.birthCountry"
    label="Country of Birth"
    variant="underlined"
    :v-model="profileToBeEdited.birthCountry"
    :items="availableCountries"
    item-title="value"
  ></v-select>

  <v-row>
    <v-col>
      <v-text-field
        label="SA ID Number"
        v-model="profileToBeEdited.saIDNumber"
        variant="underlined"
        type="number"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileToBeEdited.passportNumber"
        label="Passport Number"
        variant="underlined"
        type="number"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
