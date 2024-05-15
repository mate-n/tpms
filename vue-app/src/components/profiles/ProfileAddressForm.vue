<script setup lang="ts">
import { RomanNumeralConverter } from '@/helpers/RomanNumeralConverter'
import { CountryService } from '@/services/CountryService'
import type { ICountry } from '@/shared/interfaces/ICountry'
import type { IProfileAddress } from '@/shared/interfaces/profiles/IProfileAddress'
import { onBeforeMount, ref } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const romanNumeralConverter = new RomanNumeralConverter()
const countryService = new CountryService(axios)
const availableCountries = ref<ICountry[]>([])
defineProps({
  indexOfProfileAddress: { type: Number, required: true }
})
const emits = defineEmits(['delete', 'changeMailingAddress'])
const profileAddressToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileAddress
})
onBeforeMount(() => {
  countryService.getAvailableCountries().then((response) => {
    availableCountries.value = response
  })
})

const changeMailingAddress = () => {
  emits('changeMailingAddress', profileAddressToBeEdited.value)
}
</script>
<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="text-primary">
          Address {{ romanNumeralConverter.toRoman(indexOfProfileAddress + 1) }}</v-col
        >
        <v-col class="d-flex justify-end">
          <v-btn
            @click="$emit('delete', profileAddressToBeEdited)"
            density="compact"
            class="elevation-1 text-center mt-3 px-2 profiles-pill"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
      <v-select
        v-model="profileAddressToBeEdited.typeString"
        label="Type"
        variant="underlined"
        :items="['Business', 'Home', 'Other']"
        item-title="value"
        item-value="id"
        class="me-3"
      ></v-select>
      <v-text-field
        v-model="profileAddressToBeEdited.recipient"
        label="Recipient"
        variant="underlined"
      ></v-text-field>

      <v-select
        v-model="profileAddressToBeEdited.country"
        label="Country"
        variant="underlined"
        :items="availableCountries"
        item-title="value"
        item-value="id"
        class="me-3"
      ></v-select>

      <v-row>
        <v-col>
          <v-text-field
            v-model="profileAddressToBeEdited.zip"
            label="ZIP / Postal Code"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="profileAddressToBeEdited.city"
            label="City"
            variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="profileAddressToBeEdited.state"
        label="State / Province / Region"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="profileAddressToBeEdited.street1"
        label="Street Address"
        variant="underlined"
      ></v-text-field>
      <v-text-field v-model="profileAddressToBeEdited.street2" variant="underlined"></v-text-field>
      <v-text-field v-model="profileAddressToBeEdited.street3" variant="underlined"></v-text-field>
      <v-checkbox
        v-model="profileAddressToBeEdited.primary"
        @change="changeMailingAddress()"
        label="Mailing Address"
      ></v-checkbox>
    </v-card-text>
  </v-card>
</template>
