<script setup lang="ts">
import realmsLogo from '@/assets/images/realms-icon.webp'
import { computed, onMounted, ref, type Ref } from 'vue'
import { RouterView } from 'vue-router'
import BasketMenuCard from './components/baskets/BasketMenuCard.vue'
import { useUserStore } from './stores/user'
import { Profile } from './shared/classes/Profile'
import router from './router'
import BasketCard from './components/baskets/BasketCard.vue'
import { useRouter as UseRouter } from 'vue-router'
import { useItineraryReservationCartStore } from './stores/itineraryReservationCart'
import ErrorDialog from './components/ErrorDialog.vue'
const showApiStatus = import.meta.env.VITE_SHOW_API_STATUS === 'true'
const version = import.meta.env.VITE_VERSION

const useRouter = UseRouter()

const userStore = useUserStore()
userStore.currentProfile = new Profile()
const itineraryReservationCartStore = useItineraryReservationCartStore()
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

const showBadge = computed(() => {
  if (!itineraryReservationCartStore.itineraryReservation) {
    return false
  }
  return itineraryReservationCartStore.itineraryReservation?.protelReservations.length > 0
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
              style="color: lightgray"
              prepend-icon="mdi-circle-small"
              title="Reservations"
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
              link
              to="/itinerary-reservations"
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
              :content="
                itineraryReservationCartStore.itineraryReservation &&
                itineraryReservationCartStore.itineraryReservation.protelReservations.length
              "
              color="primary"
              :model-value="showBadge"
              data-cy="cart_icon_button"
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
    <v-main>
      <RouterView />

      <ErrorDialog></ErrorDialog>
    </v-main>
    <v-footer border app absolute class="bg-lightgray font-size-rem-6" height="25" v-if="version">
      <v-col class="text-end"> <strong>Version:</strong> {{ version }}</v-col>
    </v-footer>
  </v-app>

  <v-dialog v-model="basketDialog" scrollable auto>
    <v-card>
      <BasketCard @close="basketDialog = false"></BasketCard>
    </v-card>
  </v-dialog>
</template>
