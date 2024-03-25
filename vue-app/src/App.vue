<script setup lang="ts">
import { provide, ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import axios, { type AxiosStatic } from 'axios'
const drawer = ref(false)

// axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
provide('axios', axios)
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
