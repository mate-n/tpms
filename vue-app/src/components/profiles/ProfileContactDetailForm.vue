<script setup lang="ts">
import type { ICommunicationMethod } from '@/interfaces/ICommunicationMethod'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import { CommunicationMethodService } from '@/services/CommunicationMethodService'
import { ProfileCommunicationService } from '@/services/profiles/ProfileCommunicationService'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref } from 'vue'
const communicationMethods = ref(<ICommunicationMethod[]>[])
const axios: AxiosStatic | undefined = inject('axios')
const communicationMethodService = new CommunicationMethodService(axios)

const profileCommunicationToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileCommunication
})

onMounted(() => {
  communicationMethodService.getAvailableCommunicationMethods().then((response) => {
    communicationMethods.value = response
  })
})
</script>

<template>
  <v-sheet>
    <v-row>
      <v-col cols="1">
        <v-icon>mdi-select-all </v-icon>
      </v-col>
      <v-col>
        <v-select
          label="Select"
          variant="underlined"
          :items="communicationMethods"
          item-title="value"
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model="profileCommunicationToBeEdited.value"
          label="Value"
          variant="underlined"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-checkbox label="Primary" v-model="profileCommunicationToBeEdited.primary"> </v-checkbox>
      </v-col>
      <v-col>
        <v-icon> mdi-delete-outline </v-icon>
      </v-col>
    </v-row>
  </v-sheet>
</template>
