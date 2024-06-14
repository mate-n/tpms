<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'

const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})
</script>
<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Membership cards</span></v-toolbar-title>
      <v-btn icon class="text-gray"> <v-icon>mdi-wallet-membership</v-icon> </v-btn>
    </v-toolbar>

    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div class="mb-2">
        <span class="profile-card-caption">Membership Name</span><br />
        {{ profileToBeEdited.wildcardMembershipNumber }}
      </div>
      <div class="mb-2">
        <span class="profile-card-caption">Card Number</span><br />
        {{ profileToBeEdited.wildcardMembershipNumber }}
      </div>
    </v-container>
  </div>
</template>
