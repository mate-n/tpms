<script setup lang="ts">
import { LanguageService } from '@/services/LanguageService'
import { SalutationService } from '@/services/SalutationService'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import type { ISalutation } from '@/shared/interfaces/ISalutation'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { onMounted, ref, type Ref } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const languageService = new LanguageService(axios)
const salutationService = new SalutationService(axios)
const profileToBeEdited = defineModel({ required: true, type: Object as () => IProfile })
const languages: Ref<ILanguage[]> = ref([])
const salutations: Ref<ISalutation[]> = ref([])
const emit = defineEmits(['change', 'blur-name'])

onMounted(() => {
  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
  salutationService.getAvailableSalutations().then((response) => {
    salutations.value = response
  })
})

const blurLastName = () => {
  emit('blur-name')
}

const blurFirstName = () => {
  emit('blur-name')
}
</script>

<template>
  <div class="d-flex">
    <div style="flex-grow: 6" data-cy="private_profile_form">
      <div class="d-flex big-vue-input-field-font-size">
        <v-text-field
          v-model="profileToBeEdited.surname"
          label="Last Name"
          variant="underlined"
          class="me-3 required-input"
          :error-messages="profileToBeEdited.errors && profileToBeEdited.errors['surname']"
          @update:modelValue="emit('change')"
          @blur="blurLastName()"
          data-cy="last_name_field"
        ></v-text-field>
        <v-text-field
          v-model="profileToBeEdited.name"
          label="First Name"
          variant="underlined"
          class="me-3"
          :error-messages="profileToBeEdited.errors && profileToBeEdited.errors['name']"
          @update:modelValue="emit('change')"
          aria-required="true"
          @blur="blurFirstName()"
          data-cy="first_name_field"
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
