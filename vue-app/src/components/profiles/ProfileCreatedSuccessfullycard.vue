<script setup lang="ts">
const emit = defineEmits(['close', 'ok'])

defineProps({
  profileId: { type: Number, required: true }
})
</script>
<template>
  <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
    <v-toolbar-title><span class="text-primary">Profile has been created.</span></v-toolbar-title>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="profiles-card-divider"></v-divider>
  <v-card class="rounded-t-0">
    <v-card-text>
      <div class="mb-5">
        <div>ProfileID: {{ profileId }}</div>
      </div>
      <div class="d-flex justify-end">
        <v-btn class="me-2" @click="emit('close')">Close</v-btn>
        <v-btn class="primary-button" @click="emit('ok')">OK</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
