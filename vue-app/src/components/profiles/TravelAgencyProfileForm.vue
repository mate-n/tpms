<script setup lang="ts">
import { LanguageService } from '@/services/LanguageService'
import { SalutationService } from '@/services/SalutationService'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import type { ISalutation } from '@/shared/interfaces/ISalutation'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref, type Ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const languageService = new LanguageService(axios)
const salutationService = new SalutationService(axios)
const profileToBeEdited = defineModel({ required: true, type: Object as () => IProfile })
const languages: Ref<ILanguage[]> = ref([])
const salutations: Ref<ISalutation[]> = ref([])

onMounted(() => {
  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
  salutationService.getAvailableSalutations().then((response) => {
    salutations.value = response
  })
})
</script>

<template>
  <div class="d-flex">
    <div style="flex-grow: 6">
      <div class="d-flex align-baseline">
        <v-text-field
          v-model="profileToBeEdited.name"
          label="Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-autocomplete
          label="Salutation"
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
        <v-text-field
          v-model="profileToBeEdited.firstName"
          label="Contact First Name"
          variant="underlined"
          class="me-3"
          aria-required="true"
        ></v-text-field>
        <v-text-field
          v-model="profileToBeEdited.lastName"
          label="Contact Last Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field
          v-model="profileToBeEdited.iataCode"
          label="IATA-Code"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="profileToBeEdited.department"
          label="Department"
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
      </div>
    </div>
  </div>
</template>
