<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { RomanNumeralConverter } from '@/helpers/RomanNumeralConverter'
import type { ICountry } from '@/interfaces/ICountry'
import type { IGuestTravelDocument } from '@/interfaces/IGuestTravelDocument'
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import { CountryService } from '@/services/CountryService'
import { GuestTravelDocumentService } from '@/services/GuestTravelDocumentService'
import { ProfileDocumentService } from '@/services/profiles/ProfileDocumentService'
import type { AxiosStatic } from 'axios'
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
const romanNumeralConverter = new RomanNumeralConverter()
defineProps({
  indexOfProfileDocument: { type: Number, required: true }
})
const dateFormatter = new DateFormatter()
const axios: AxiosStatic | undefined = inject('axios')
const profileDocumentService = new ProfileDocumentService(axios)
const guestTravelDocumentService = new GuestTravelDocumentService(axios)
const countryService = new CountryService(axios)
const availableCountries = ref<ICountry[]>([])
const guestTravelDocuments = ref<IGuestTravelDocument[]>([])
const issueDateMenu = ref(false)
const changeIssueDate = (date: any) => {
  profileDocumentToBeEdited.value.validFrom = date
}
const expiryDateMenu = ref(false)
const changeExpiryDate = (date: any) => {
  profileDocumentToBeEdited.value.validTo = date
}

const emits = defineEmits(['delete', 'changePrimary'])
const profileDocumentToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileDocument
})

watch(
  profileDocumentToBeEdited,
  () => {
    showSaveButton.value = true
  },
  { deep: true }
)
const showSaveButton = ref(false)

onBeforeMount(() => {
  countryService.getAvailableCountries().then((response) => {
    availableCountries.value = response
  })
  guestTravelDocumentService.getAvailableGuestTravelDocuments().then((response) => {
    guestTravelDocuments.value = response
  })
})

const validFromFormatted = computed(() => {
  return dateFormatter.dddotmmdotyyyy(profileDocumentToBeEdited.value.validFrom)
})

const validToFormatted = computed(() => {
  return dateFormatter.dddotmmdotyyyy(profileDocumentToBeEdited.value.validTo)
})

const changePrimary = () => {
  emits('changePrimary', profileDocumentToBeEdited.value)
}

const saveProfileDocument = () => {
  profileDocumentService.createOrUpdate(profileDocumentToBeEdited.value).then(() => {
    showSaveButton.value = false
  })
}
</script>
<template>
  <v-card>
    <v-card-text>
      <v-row class="height-45">
        <v-col class="text-primary"
          >Document {{ romanNumeralConverter.toRoman(indexOfProfileDocument + 1) }}</v-col
        >
        <v-col class="d-flex justify-end align-center">
          <v-btn
            class="text-primary"
            v-if="showSaveButton"
            variant="text"
            @click="saveProfileDocument()"
            icon
          >
            <v-icon>mdi-content-save-outline</v-icon></v-btn
          >

          <v-btn
            @click="emits('delete', profileDocumentToBeEdited)"
            density="compact"
            class="elevation-1 text-center px-2 profiles-pill"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
      <v-select
        v-model="profileDocumentToBeEdited.typeID"
        label="Type"
        variant="underlined"
        :items="guestTravelDocuments"
        item-title="value"
        item-value="id"
        class="me-3"
      ></v-select>
      <v-text-field
        label="Number"
        variant="underlined"
        v-model="profileDocumentToBeEdited.number"
      ></v-text-field>
      <v-row>
        <v-col>
          <v-menu v-model="issueDateMenu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                label="Issue date"
                append-inner-icon="mdi-calendar"
                v-model="validFromFormatted"
                v-bind="props"
                variant="underlined"
              ></v-text-field>
            </template>
            <v-card>
              <v-date-picker
                :hide-header="true"
                :v-model="profileDocumentToBeEdited.validFrom"
                @update:model-value="(value) => changeIssueDate(value)"
              >
              </v-date-picker>
            </v-card>
          </v-menu>
        </v-col>
        <v-col>
          <v-select
            label="Country of issue"
            variant="underlined"
            v-model="profileDocumentToBeEdited.country"
            :items="availableCountries"
            item-title="value"
            item-value="id"
            class="me-3"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-menu v-model="expiryDateMenu" :close-on-content-click="false">
            <template v-slot:activator="{ props }">
              <v-text-field
                label="Expiry date"
                append-inner-icon="mdi-calendar"
                v-model="validToFormatted"
                v-bind="props"
                variant="underlined"
              ></v-text-field>
            </template>
            <v-card>
              <v-date-picker
                :hide-header="true"
                :v-model="profileDocumentToBeEdited.validTo"
                @update:model-value="(value) => changeExpiryDate(value)"
              >
              </v-date-picker>
            </v-card>
          </v-menu>
        </v-col>
        <v-col>
          <v-text-field
            label="Place of issue"
            variant="underlined"
            v-model="profileDocumentToBeEdited.city"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-checkbox
        @change="changePrimary()"
        v-model="profileDocumentToBeEdited.primary"
        label="Primary Document"
      ></v-checkbox>
    </v-card-text>
  </v-card>
</template>
