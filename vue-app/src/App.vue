<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useBasketItemsStore } from './stores/basketItems'
import BasketMenuCard from './components/baskets/BasketMenuCard.vue'
import { useUserStore } from './stores/user'
import { Profile } from './shared/classes/Profile'
import router from './router'
const userStore = useUserStore()
userStore.currentProfile = new Profile()
const basketItemsStore = useBasketItemsStore()
const drawer = ref(true)
const reservationsMenu = ref(false)
const rail = ref(false)
const toggleRail = () => {
  rail.value = !rail.value
}

const goHome = () => {
  router.push('/')
}
</script>

<style>
#innerExPan > * {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
</style>

<template>
  <v-app>
    <v-navigation-drawer rail expand-on-hover :width="400" rail-width="65" v-model="drawer">
      <v-list-item
        prepend-icon="mdi-home-heart"
        :title="$t('app.name')"
        value="home"
        @click="goHome()"
      ></v-list-item>

      <v-divider></v-divider>
      <v-list-item
        color="primary"
        prepend-icon="mdi-home-outline"
        title="Dashboard"
        value="dashboard"
        to="/dashboard"
      ></v-list-item>
      <v-expansion-panels class="ma-0 pa-0">
        <v-expansion-panel class="ma-0">
          <v-expansion-panel-title class="pa-0 ms-0 me-4"
            ><v-icon class="ms-4">mdi-store-outline</v-icon> <span class="ms-8"></span>Front
            Desk</v-expansion-panel-title
          >
          <v-expansion-panel-text id="innerExPan">
            <v-list-item
              color="primary"
              prepend-icon="mdi-circle-small"
              link
              title="Reservations"
              to="/reservations"
            ></v-list-item>
            <v-list-item
              color="primary"
              prepend-icon="mdi-circle-small"
              link
              title="Profiles"
              to="/profile-search"
            ></v-list-item>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-list-item
        color="primary"
        link
        title="Itinerary Reservation Enquiry"
        to="/itinerary-reservation-enquiry"
      ></v-list-item>
      <v-list-item link title="New Profile" to="/new-profile"></v-list-item>

      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar app :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="toggleRail()">
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
