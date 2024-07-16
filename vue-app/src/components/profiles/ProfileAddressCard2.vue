<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'

const profile = defineModel({ required: true, type: Object as () => IProfile })
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Address</span></v-toolbar-title>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <v-text-field
        v-model="profile.country"
        label="Country"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profile.city"
        label="City"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profile.postalCode"
        label="Postal Code"
        variant="underlined"
        class="me-3"
      ></v-text-field>
      <v-text-field
        v-model="profile.address"
        label="Address"
        variant="underlined"
        class="me-3"
      ></v-text-field>
    </v-container>
  </div>
</template>
