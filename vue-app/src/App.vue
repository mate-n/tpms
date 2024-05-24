<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useBasketItemsStore } from './stores/basketItems'
import BasketMenuCard from './components/baskets/BasketMenuCard.vue'
import { useUserStore } from './stores/user'
import { Profile } from './shared/classes/Profile'
const userStore = useUserStore()
userStore.currentProfile = new Profile()
const basketItemsStore = useBasketItemsStore()
const drawer = ref(false)
const reservationsMenu = ref(false)
</script>

<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer">
      <v-list-item :title="$t('app.name')"></v-list-item>
      <v-divider></v-divider>
      <v-list-item link title="Home" to="/"></v-list-item>
      <v-list-item link title="About" to="/about"></v-list-item>
      <v-list-item
        link
        title="Itinerary Reservation Enquiry"
        to="/itinerary-reservation-enquiry"
      ></v-list-item>
      <v-list-item link title="New Profile" to="/new-profile"></v-list-item>
      <v-list-item link title="Profile Search" to="/profile-search"></v-list-item>
    </v-navigation-drawer>

    <v-app-bar app :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = true">
          <v-icon icon="mdi-home-heart"></v-icon>
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>{{ $t('app.name') }}</v-app-bar-title>
      <v-menu v-model="reservationsMenu" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-badge
              :content="basketItemsStore.reservations.length"
              color="primary"
              :model-value="basketItemsStore.reservations.length > 0"
            >
              <v-icon icon="mdi-cart-outline" size="x-large"></v-icon>
            </v-badge>
          </v-btn>
        </template>
        <BasketMenuCard @close="reservationsMenu = false" />
      </v-menu>
    </v-app-bar>

    <v-main> <RouterView /></v-main>
  </v-app>
</template>
