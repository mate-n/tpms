<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { ref } from 'vue'
import ProfileMembershipsForm from './ProfileMembershipsForm.vue'
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})
const profileMembershipsDialog = ref(false)
</script>
<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Membership cards</span></v-toolbar-title>
      <v-btn icon class="text-gray" @click="profileMembershipsDialog = true">
        <v-icon>mdi-wallet-membership</v-icon>
      </v-btn>
    </v-toolbar>

    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div
        v-for="membershipCard of profileToBeEdited.membershipCards"
        :key="membershipCard.membershipName"
      >
        <div class="mb-2">
          <span class="profile-card-caption">Membership Name</span><br />
          {{ membershipCard.membershipName }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption">Card Number</span><br />
          {{ membershipCard.cardNumber }}
        </div>
        <hr />
      </div>
    </v-container>
  </div>

  <v-dialog v-model="profileMembershipsDialog">
    <v-card>
      <ProfileMembershipsForm
        v-model="profileToBeEdited"
        @close="profileMembershipsDialog = false"
      ></ProfileMembershipsForm>
    </v-card>
  </v-dialog>
</template>
