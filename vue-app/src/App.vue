<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <v-app>
    <!-- Must have the app property -->
    <v-app-bar app :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon>
          <v-icon color="green-darken-2" icon="mdi-home-heart"></v-icon>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>tpms-frontend</v-app-bar-title>

      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </v-app-bar>

    <v-main> <RouterView /></v-main>
  </v-app>
</template>
