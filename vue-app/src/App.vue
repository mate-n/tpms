<script setup lang="ts">
import realmsLogo from '@/assets/images/realms-icon.webp'
import { computed, inject, onMounted, ref, type Ref } from 'vue'
import { RouterView } from 'vue-router'
import { useBasketItemsStore } from './stores/basketItems'
import BasketMenuCard from './components/baskets/BasketMenuCard.vue'
import { useUserStore } from './stores/user'
import { Profile } from './shared/classes/Profile'
import router from './router'
import BasketCard from './components/baskets/BasketCard.vue'
import { useRouter as UseRouter } from 'vue-router'
import { ProtelApiStatusService } from './services/protel/ProtelApiStatusService'
import type { AxiosStatic } from 'axios'
const axios: AxiosStatic | undefined = inject('axios')
const protelApiStatusService = new ProtelApiStatusService(axios)
const protelApiStatus = ref('waiting...')
const protelApiStatusIcon = computed(() => {
  if (protelApiStatus.value === 'waiting...') {
    return 'mdi-clock-outline'
  } else if (protelApiStatus.value === 'success') {
    return 'mdi-check-circle-outline'
  } else {
    return 'mdi-alert-circle-outline'
  }
})
const protelApiStatusColor = computed(() => {
  if (protelApiStatus.value === 'waiting...') {
    return 'grey'
  } else if (protelApiStatus.value === 'success') {
    return 'green'
  } else {
    return 'red'
  }
})

const useRouter = UseRouter()

const userStore = useUserStore()
userStore.currentProfile = new Profile()
const basketItemsStore = useBasketItemsStore()
const reservationsMenu = ref(false)

const goHome = () => {
  router.push('/')
}

const expansionPanelReservation: Ref<String[]> = ref(['front-desk'])

const basketDialog = ref(false)

const clickOnViewCart = () => {
  reservationsMenu.value = false
  basketDialog.value = true
}
const showNavigationDrawer = computed(() => {
  return useRouter.currentRoute.value.name !== 'login'
})

onMounted(() => {
  protelApiStatusService.getStatus().then((response) => {
    protelApiStatus.value = response
  })
})
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
    <v-navigation-drawer
      v-model="showNavigationDrawer"
      :width="330"
      mobile-breakpoint="xs"
      rail-width="55"
    >
      <v-list-item
        height="5rem"
        prepend-icon="mdi-menu"
        value="home"
        @click="goHome()"
        class="bg-lightgray"
      >
        <div><strong>TPMS-Frontend</strong></div>
        <div class="d-flex align-center justify-start">
          <div>Realms</div>
          <div class="ms-3 mt-1">
            <v-img width="1.8rem" height="1.8rem" aspect-ratio="1/1" :src="realmsLogo"></v-img>
          </div>
        </div>
      </v-list-item>

      <v-divider></v-divider>
      <v-list-item
        color="primary"
        prepend-icon="mdi-home-outline"
        title="Dashboard"
        value="dashboard"
        to="/dashboard"
      ></v-list-item>
      <v-expansion-panels class="ma-0 pa-0" v-model="expansionPanelReservation">
        <v-expansion-panel class="ma-0" value="front-desk">
          <v-expansion-panel-title class="pa-0 ms-0 me-4"
            ><v-icon class="ms-4">mdi-store-outline</v-icon> <span class="ms-8"></span>Front
            Desk</v-expansion-panel-title
          >
          <v-expansion-panel-text id="innerExPan">
            <v-list-item
              color="primary"
              prepend-icon="mdi-circle-small"
              link
              title="Profiles"
              to="/profiles"
            ></v-list-item>
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
              title="Itinerary Reservation Enquiry"
              to="/itinerary-reservation-enquiry"
            ></v-list-item>
            <v-list-item
              color="primary"
              prepend-icon="mdi-circle-small"
              title="Itinerary Reservations"
              to="/itinerary-reservations"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list-item
              :base-color="protelApiStatusColor"
              :prepend-icon="protelApiStatusIcon"
              title="Protel API Status"
              :subtitle="protelApiStatus"
            ></v-list-item>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar app :elevation="2">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="goHome()">
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

        <BasketMenuCard
          @close="reservationsMenu = false"
          @click-on-view-cart="() => clickOnViewCart()"
        />
      </v-menu>
    </v-app-bar>
    <v-main> <RouterView /></v-main>

    <v-dialog v-model="basketDialog" scrollable auto>
      <v-card>
        <BasketCard @close="basketDialog = false"></BasketCard>
      </v-card>
    </v-dialog>
  </v-app>
</template>
inject, import type { AxiosStatic } from 'axios'
