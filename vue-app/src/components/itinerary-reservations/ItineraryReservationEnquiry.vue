<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { DateHelper } from '@/helpers/DateHelper'
import { ItineraryReservationValidator } from '@/validators/ItineraryReservationValidator'
import { useBasketItemsStore } from '@/stores/basketItems'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'
import ReservationFormInEnquiry from './ReservationFormInEnquiry.vue'
import BasketCard from '@/components/baskets/BasketCard.vue'
import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import type { AxiosStatic } from 'axios'
import { ProtelRegionService } from '@/services/protel/ProtelRegionService'
import { ProtelParkService } from '@/services/protel/ProtelParkService'
import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import type { IProtelParkSearch } from '@/shared/interfaces/protel/IProtelParkSearch'
const regions: Ref<IProtelRegion[]> = ref([])
const parks: Ref<IProtelPark[]> = ref([])
const basketItemsStore = useBasketItemsStore()
const dateHelper = new DateHelper()
const itineraryReservationValidator = new ItineraryReservationValidator()
const reservations: Ref<IReservation[]> = ref([])
const axios: AxiosStatic | undefined = inject('axios')
const protelRegionService = new ProtelRegionService(axios)
const protelParkService = new ProtelParkService(axios)

const updateOrderIndexes = () => {
  reservations.value.forEach((reservation, index) => {
    reservation.orderIndex = index
  })
}

const addReservation = () => {
  const lastReservation = reservations.value[reservations.value.length - 1]
  const newReservation = new Reservation()
  reservations.value.push(newReservation)
  if (lastReservation) {
    newReservation.arrivalDate = lastReservation.departureDate
    newReservation.profileID = selectedProfile.value
  }
  const newDepartureDate = dateHelper.addDays(newReservation.arrivalDate, 2)
  newReservation.departureDate = newDepartureDate
  showBookButton.value = false
}

const onReservationChanged = () => {
  updateAllReservations()
  checkForIssues()
  updateShowBookButton()
}

const removeReservation = (reservation: IReservation) => {
  const index = reservations.value.indexOf(reservation)
  reservations.value.splice(index, 1)
  updateAllReservations()
  checkForIssues()
}

const selectedProfile = computed(() => {
  if (reservations.value.length === 0) return 0
  return reservations.value[0].profileID
})

const updateAllReservations = () => {
  for (const reservation of reservations.value) {
    reservation.profileID = selectedProfile.value
  }
}

const checkForIssues = () => {
  itineraryReservationValidator.validate(reservations.value)
}

const updateShowBookButton = () => {
  const errors = itineraryReservationValidator.getErrors(reservations.value)
  if (errors.length > 0) {
    showBookButton.value = false
  } else {
    showBookButton.value = true
  }
}

const clickOnAddToCart = () => {
  closeExpansionPanels.value++
  updateOrderIndexes()
  for (const reservation of reservations.value) {
    basketItemsStore.addReservation(reservation)
  }
}

const closeExpansionPanels = ref(0)

onBeforeMount(() => {
  addReservation()
  getRegions()
  getParks()
})

const getRegions = () => {
  protelRegionService.findAll().then((res) => {
    regions.value = res
  })
}

const getParks = () => {
  if (selectedRegions.value.length === 0) {
    protelParkService.findAll().then((res) => {
      parks.value = res
    })
  } else {
    const protelParkSearch: IProtelParkSearch = {
      regionNames: selectedRegions.value.map((region) => region.name)
    }
    protelParkService.search(protelParkSearch).then((res) => {
      parks.value = res
    })
  }
}

const showBookButton = ref(false)

const clickOnViewCart = () => {
  basketDialog.value = true
}

const basketDialog = ref(false)
const selectedRegions = ref<IProtelRegion[]>([])

watch(
  selectedRegions,
  () => {
    getParks()
  },
  {
    deep: true
  }
)
</script>

<template>
  <v-toolbar title=" " class="py-1 bg-primary text-white d-flex justify-space-between">
    <div class="my-2">
      <v-autocomplete
        v-model="selectedRegions"
        clearable
        chips
        label="Regions"
        :items="regions"
        item-title="name"
        return-object
        multiple
      ></v-autocomplete>
    </div>
    <div class="my-2">
      <v-autocomplete
        clearable
        chips
        label="Parks"
        :items="parks"
        item-title="name"
        multiple
      ></v-autocomplete>
    </div>

    <div class="my-2">
      <v-autocomplete
        clearable
        chips
        label="Camps"
        :items="regions"
        item-title="name"
        multiple
      ></v-autocomplete>
    </div>
    <v-menu>
      <template v-slot:activator="{ props, isActive }">
        <v-btn class="bg-white" v-bind="props">
          {{ $t('general.addReservation') }}
          <v-icon v-if="isActive" icon="mdi-chevron-up"></v-icon>
          <v-icon v-if="!isActive" icon="mdi-chevron-down"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="addReservation()">
          <v-list-item-title class="d-flex justify-space-between">
            New <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled class="bg-lightgray">
          <v-list-item-title class="d-flex justify-space-between">
            Existing <v-icon>mdi-playlist-plus</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>

  <template v-for="(reservation, i) of reservations" :key="reservation.id">
    <ReservationFormInEnquiry
      v-model="reservations[i]"
      @check="checkForIssues()"
      @change="onReservationChanged()"
      @remove="(reservation) => removeReservation(reservation)"
      :previous-reservation="reservations[i - 1]"
      :next-reservation="reservations[i + 1]"
      :collapse-expansion="closeExpansionPanels"
    ></ReservationFormInEnquiry>
  </template>

  <v-container fluid>
    <div class="d-flex justify-end mt-3">
      <v-btn class="secondary-button" @click="clickOnViewCart()">View Cart</v-btn>
      <v-btn class="ml-2 primary-button" v-if="showBookButton" @click="clickOnAddToCart()"
        >Add to Cart</v-btn
      >
    </div>
  </v-container>

  <v-dialog v-model="basketDialog" scrollable auto>
    <v-card>
      <BasketCard @close="basketDialog = false"></BasketCard>
    </v-card>
  </v-dialog>
</template>
