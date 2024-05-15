<script setup lang="ts">
const emits = defineEmits(['close'])
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Text History</span></v-toolbar-title>
      <div class="standard-card-toolbar-button">Add</div>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray"> </v-container>
  </div>
</template>
