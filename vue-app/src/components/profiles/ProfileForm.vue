<script setup lang="ts">
import { Profile } from '@/classes/Profile'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { ref } from 'vue'

const newProfile = ref<IProfile>(new Profile())
</script>
<template>
  <div class="d-flex">
    <div>
      <div class="color-avatar-tertiary text-white">O</div>
      <div>PRIVATE</div>
    </div>
    <div class="flex-grow-1">
      <div class="d-flex">
        <v-text-field
          v-model="newProfile.lastName"
          label="Last Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.firstName"
          label="First Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.middleName"
          label="Middle Name"
          variant="underlined"
          class="me-3"
        ></v-text-field>
      </div>
      <div class="d-flex">
        <v-text-field
          v-model="newProfile.firstName"
          label="Salutation"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.firstName"
          label="Personal Salutation"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.firstName"
          label="Language"
          variant="underlined"
          class="me-3"
        ></v-text-field>
        <v-text-field
          v-model="newProfile.firstName"
          label="VIP"
          variant="underlined"
          class="me-3"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>
