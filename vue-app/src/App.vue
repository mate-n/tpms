<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer">
      <v-list-item :title="$t('app.name')"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Home" to="/"></v-list-item>

      <v-list-item link title="About" to="/about"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar app :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = true">
          <v-icon icon="mdi-home-heart"></v-icon>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ $t('app.name') }}</v-app-bar-title>
    </v-app-bar>

    <v-main> <RouterView /></v-main>
  </v-app>
</template>
