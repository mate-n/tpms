<script setup lang="ts">
import { CommunicationMethodHelper } from '@/helpers/CommunicationMethodHelper'
import { CommunicationMethodService } from '@/services/CommunicationMethodService'
import type { ICommunicationMethod } from '@/shared/interfaces/ICommunicationMethod'
import type { IProfileCommunication } from '@/shared/interfaces/profiles/IProfileCommunication'
import { ProfileCommunicationValidator } from '@/shared/validators/ProfileCommunicationValidator'
import { computed, onBeforeMount, ref, type Ref } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { ValidityHelper } from '@/helpers/ValidityHelper'
const axios: AxiosStatic | undefined = inject('axios')
const emit = defineEmits(['delete'])
const communicationMethods: Ref<ICommunicationMethod[]> = ref([])
const communicationMethodService = new CommunicationMethodService(axios)
const communicationMethodHelper = new CommunicationMethodHelper()
const profileCommunicationValidator = new ProfileCommunicationValidator()
const validityHelper = new ValidityHelper()
const profileCommunicationToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileCommunication
})
const profileCommunicationValuePlaceholder = computed(() => {
  if (profileCommunicationToBeEdited.value.communicationTypeID === 143) {
    return '+1 212 456 7890'
  } else {
    return ''
  }
})
onBeforeMount(() => {
  communicationMethodService.getAvailableCommunicationMethods().then((response) => {
    communicationMethods.value = response
  })
})

const deleteProfileCommunication = () => {
  emit('delete', profileCommunicationToBeEdited.value)
}

const updateCommunicationTypeName = () => {
  const foundCommunicationMethod = communicationMethods.value.find(
    (cm) => cm.id === profileCommunicationToBeEdited.value.communicationTypeID
  )
  if (foundCommunicationMethod) {
    profileCommunicationToBeEdited.value.communicationTypeName = foundCommunicationMethod?.value
  } else {
    profileCommunicationToBeEdited.value.communicationTypeName = ''
  }
  validate()
}

const validate = () => {
  profileCommunicationValidator.validate(profileCommunicationToBeEdited.value)
}
</script>

<template>
  <v-row class="align-center" no-gutters>
    <v-col cols="1" class="d-flex justify-center">
      <v-icon class="text-gray">
        {{
          communicationMethodHelper.getIconNameForCommunicationMethod(
            profileCommunicationToBeEdited.communicationTypeName
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
        @update:model-value="updateCommunicationTypeName()"
      ></v-select>
    </v-col>
    <v-col>
      <v-text-field
        v-model="profileCommunicationToBeEdited.value"
        label="Value"
        variant="underlined"
        class="me-3"
        :placeholder="profileCommunicationValuePlaceholder"
        :error-messages="
          profileCommunicationToBeEdited.errors && profileCommunicationToBeEdited.errors['value']
        "
        @update:model-value="validate()"
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
