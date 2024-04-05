<script setup lang="ts">
import { ref } from 'vue'
import ProfileForm from './ProfileForm.vue'
const emit = defineEmits(['close', 'profileSelected'])
const close = () => emit('close')
const isFullScreen = ref(false)

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
  const elem = document.documentElement
  if (isFullScreen.value) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}
</script>
<template>
  <v-toolbar>
    <v-toolbar-title>New Profile</v-toolbar-title>
    <div class="border-s h-100 d-flex px-5 align-center" @click="toggleFullScreen()">
      <template v-if="isFullScreen">
        <v-btn><v-icon>mdi-fullscreen-exit</v-icon></v-btn>
      </template>
      <template v-if="!isFullScreen">
        <v-btn><v-icon>mdi-fullscreen</v-icon></v-btn>
      </template>
    </div>
    <div class="border-s h-100 d-flex px-5 align-center" @click="close()">
      <v-btn><v-icon>mdi-close</v-icon></v-btn>
    </div>
  </v-toolbar>
  <div>
    <ProfileForm></ProfileForm>
  </div>
</template>
