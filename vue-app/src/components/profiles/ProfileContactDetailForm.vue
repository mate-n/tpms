<script setup lang="ts">
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'

const profileCommunicationToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileCommunication
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
          :items="['E-Mail', 'Mobile', 'Phone', 'Skype']"
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
