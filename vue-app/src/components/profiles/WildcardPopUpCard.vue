<script setup lang="ts">
const emit = defineEmits(['close', 'ok'])
</script>
<template>
  <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
    <v-toolbar-title><span class="text-primary">Wildcard</span></v-toolbar-title>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="profiles-card-divider"></v-divider>
  <v-card class="rounded-t-0">
    <v-card-text>
      <div class="mb-5">
        <p class="mb-2">Your travel would be cheaper with a Wildcard.</p>
        <p class="mb-2">Would you like to buy one?</p>
        <p class="mb-2">
          Visit
          <a href="https://www.sanparks.org/wild-card/types-pricing" target="_blank"
            >https://www.sanparks.org/wild-card/types-pricing</a
          >
          for more information.
        </p>
      </div>
      <div class="d-flex justify-end">
        <v-btn class="me-2" @click="emit('close')">Close</v-btn>
        <v-btn class="primary-button" @click="emit('ok')">OK</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
