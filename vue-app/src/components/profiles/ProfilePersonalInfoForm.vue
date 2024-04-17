<script setup lang="ts">
import type { IGender } from '@/interfaces/IGender'
import type { INationality } from '@/interfaces/INationality'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { GenderService } from '@/services/GenderService'
import { NationalityService } from '@/services/NationalityService'
import { CountryService } from '@/services/CountryService'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref } from 'vue'
import type { ICountry } from '@/interfaces/ICountry'
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

const birthdayMenu = ref(false)

const changeBirthDay = (date: any) => {
  profileToBeEdited.value.birthday = date
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
</script>

<template>
  <v-row>
    <v-col>
      <v-menu v-model="birthdayMenu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-text-field
            label="Date of Birth"
            append-inner-icon="mdi-calendar"
            v-model="profileToBeEdited.birthday"
            v-bind="props"
            variant="underlined"
          ></v-text-field>
        </template>
        <v-card>
          <v-date-picker
            :hide-header="true"
            :v-model="profileToBeEdited.birthday"
            @update:model-value="(value) => changeBirthDay(value)"
          >
          </v-date-picker>
        </v-card>
      </v-menu>
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
    label="Gender"
    variant="underlined"
    :v-model="profileToBeEdited.gender"
    :items="availableGenders"
    item-title="value"
  ></v-select>
  <v-select
    label="Nationality"
    variant="underlined"
    :v-model="profileToBeEdited.nationality"
    :items="availableNationalities"
    item-title="value"
  ></v-select>
  <v-select
    label="Country of Birth"
    variant="underlined"
    :v-model="profileToBeEdited.birthCountry"
    :items="availableCountries"
    item-title="value"
  ></v-select>
</template>
