<script setup lang="ts">
import ProfileForm from './ProfileForm.vue'
const emit = defineEmits(['close', 'profileSelected'])
const close = () => emit('close')
</script>
<template>
  <v-toolbar>
    <v-toolbar-title>New Profile</v-toolbar-title>
    <div class="border-s h-100 d-flex px-5 align-center" @click="close()">
      <v-btn><v-icon>mdi-close</v-icon></v-btn>
    </div>
  </v-toolbar>
  <div>
    <ProfileForm></ProfileForm>
  </div>
</template>
