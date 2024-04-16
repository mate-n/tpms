<script setup lang="ts">
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { ref } from 'vue'

const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

const birthdayMenu = ref(false)

const changeBirthDay = (date: any) => {
  profileToBeEdited.value.birthday = date
}
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

  <v-select label="Gender" variant="underlined" :v-model="profileToBeEdited.gender"></v-select>
  <v-select
    label="Nationality"
    variant="underlined"
    :v-model="profileToBeEdited.nationality"
  ></v-select>
  <v-select
    label="Country of Birth"
    variant="underlined"
    :v-model="profileToBeEdited.birthCountry"
  ></v-select>
</template>
