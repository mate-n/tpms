<script setup lang="ts">
import type { IProfileContactDetail } from '@/interfaces/profiles/IProfileContactDetail'
const contactDetailsToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileContactDetail
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
          v-model="contactDetailsToBeEdited.type"
          variant="underlined"
          :items="['E-Mail', 'Mobile', 'Phone', 'Skype']"
        ></v-select>
      </v-col>
      <v-col>
        <v-text-field
          v-model="contactDetailsToBeEdited.value"
          label="Value"
          variant="underlined"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-checkbox label="Primary" v-model="contactDetailsToBeEdited.isPrimary"> </v-checkbox>
      </v-col>
      <v-col>
        <v-icon> mdi-delete-outline </v-icon>
      </v-col>
    </v-row>
  </v-sheet>
</template>
