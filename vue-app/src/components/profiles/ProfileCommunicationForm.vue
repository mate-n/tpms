<script setup lang="ts">
import { CommunicationMethodHelper } from '@/helpers/CommunicationMethodHelper'
import type { ICommunicationMethod } from '@/interfaces/ICommunicationMethod'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
import { CommunicationMethodService } from '@/services/CommunicationMethodService'
import { ProfileCommunicationService } from '@/services/profiles/ProfileCommunicationService'
import type { AxiosStatic } from 'axios'
import { inject, onBeforeMount, ref } from 'vue'
const emit = defineEmits(['delete'])
const communicationMethods = ref(<ICommunicationMethod[]>[])
const axios: AxiosStatic | undefined = inject('axios')
const profileCommunicationService = new ProfileCommunicationService(axios)
const communicationMethodService = new CommunicationMethodService(axios)
const communicationMethodHelper = new CommunicationMethodHelper()
const profileCommunicationToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileCommunication
})

onBeforeMount(() => {
  communicationMethodService.getAvailableCommunicationMethods().then((response) => {
    communicationMethods.value = response
  })
})

const deleteProfileCommunication = () => {
  profileCommunicationService.delete(profileCommunicationToBeEdited.value).then(() => {
    emit('delete')
  })
}
</script>

<template>
  <v-row class="align-center" no-gutters>
    <v-col cols="1" class="d-flex justify-center">
      <v-icon class="text-gray">
        {{
          communicationMethodHelper.getIconNameForCommunicationMethod(
            communicationMethods.find(
              (cm) => cm.id === profileCommunicationToBeEdited.communicationTypeID
            )?.value
          )
        }}
      </v-icon>
    </v-col>
    <v-col>
      <v-select
        v-model="profileCommunicationToBeEdited.communicationTypeID"
        label="Select"
        variant="underlined"
        :items="communicationMethods"
        item-title="value"
        item-value="id"
        class="me-3"
      ></v-select>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileCommunicationToBeEdited.value"
        label="Value"
        variant="underlined"
        class="me-3"
      ></v-text-field>
    </v-col>
    <v-col>
      <v-checkbox label="Primary" v-model="profileCommunicationToBeEdited.primary"> </v-checkbox>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-btn variant="text" icon>
        <v-icon class="text-gray" @click="deleteProfileCommunication()">
          mdi-delete-outline
        </v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
