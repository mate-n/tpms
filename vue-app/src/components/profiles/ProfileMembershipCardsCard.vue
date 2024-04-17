<script setup lang="ts"></script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Membership cards</span></v-toolbar-title>
      <v-btn icon class="text-gray"> <v-icon>mdi-wallet-membership</v-icon> </v-btn>
    </v-toolbar>

    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div class="mb-2">
        <span class="profile-card-caption">Name of program</span><br />
        -
      </div>
      <div class="mb-2">
        <span class="profile-card-caption">Card Number</span><br />
        -
      </div>
      <div class="mb-2">
        <span class="profile-card-caption">Point balance</span><br />
        -
      </div>
      <div class="mb-2">
        <span class="profile-card-caption">Tier Level</span><br />
        -
      </div>
      <div class="mb-2">
        <span class="profile-card-caption">Expiration Date</span><br />
        -
      </div>
    </v-container>
  </div>
</template>
