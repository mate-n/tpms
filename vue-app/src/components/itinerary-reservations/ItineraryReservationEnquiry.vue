<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { ItineraryReservationValidator } from '@/validators/ItineraryReservationValidator'
import { useBasketItemsStore } from '@/stores/basketItems'
import { Reservation } from '@/shared/classes/Reservation'
import BasketCard from '@/components/baskets/BasketCard.vue'
import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import type { AxiosStatic } from 'axios'
import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import DateSelecter from '@/components/dates/DateSelecter.vue'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import ProfileSearchField from '@/components/profiles/ProfileSearchField.vue'
import { RegionService } from '@/services/backend-middleware/RegionService'
import { ParkService } from '@/services/backend-middleware/ParkService'
import { CampService } from '@/services/backend-middleware/CampService'
import CampWithAvailabilities from './CampWithAvailabilities.vue'
const regionsInDropdown: Ref<IProtelRegion[]> = ref([])
const allParks: Ref<IProtelPark[]> = ref([])
const parksInDropdown: Ref<IProtelPark[]> = ref([])
const allCamps: Ref<IProtelCamp[]> = ref([])
const campsInDropdown: Ref<IProtelCamp[]> = ref([])
const basketItemsStore = useBasketItemsStore()
const itineraryReservationValidator = new ItineraryReservationValidator()
const axios2: AxiosStatic | undefined = inject('axios2')
const regionService = new RegionService(axios2)
const parkService = new ParkService(axios2)
const campService = new CampService(axios2)
const itineraryReservation = ref(new ItineraryReservation())

const updateOrderIndexes = () => {
  itineraryReservation.value.reservations.forEach((reservation, index) => {
    reservation.orderIndex = index
  })
}

const onReservationChanged = () => {
  updateAllReservations()
  checkForIssues()
  updateShowBookButton()
}

const selectedProfile = computed(() => {
  if (itineraryReservation.value.reservations.length === 0) return 0
  return itineraryReservation.value.reservations[0].profileID
})

const updateAllReservations = () => {
  for (const reservation of itineraryReservation.value.reservations) {
    reservation.profileID = selectedProfile.value
  }
}

const checkForIssues = () => {
  itineraryReservationValidator.validate(itineraryReservation.value.reservations)
}

const updateShowBookButton = () => {
  const errors = itineraryReservationValidator.getErrors(itineraryReservation.value.reservations)
  if (errors.length > 0) {
    showBookButton.value = false
  } else {
    showBookButton.value = true
  }
}

const clickOnAddToCart = () => {
  closeExpansionPanels.value++
  updateOrderIndexes()
  basketItemsStore.addReservations(itineraryReservation.value.reservations)
}

const closeExpansionPanels = ref(0)

onBeforeMount(() => {
  getRegions()
  getParks()
  getCamps()
})

const getRegions = () => {
  regionService.findAll().then((res) => {
    regionsInDropdown.value = res
  })
}

const getParks = () => {
  parkService.findAll().then((res) => {
    allParks.value = res
    parksInDropdown.value = res
  })
}

const updateParks = () => {
  itineraryReservation.value.selectedParks = []
  itineraryReservation.value.selectedCamps = []
  const selectedRegions = itineraryReservation.value.selectedRegions
  if (selectedRegions.length === 0) {
    parksInDropdown.value = allParks.value
  } else {
    parksInDropdown.value = allParks.value.filter((park) =>
      selectedRegions.map((region) => region.name).includes(park.regionName)
    )
  }
}

const updateCamps = () => {
  itineraryReservation.value.selectedCamps = []

  const selectedParks = itineraryReservation.value.selectedParks
  if (selectedParks.length === 0) {
    campsInDropdown.value = allCamps.value
  } else {
    campsInDropdown.value = allCamps.value.filter((camp) =>
      selectedParks.map((park) => park.id).includes(camp.parkID)
    )
  }
}

const selectAllCampsInDropdown = () => {
  updateCamps()
  itineraryReservation.value.selectedCamps = campsInDropdown.value
}

const getCamps = () => {
  return new Promise<void>((resolve) => {
    campService.findAll().then((res) => {
      allCamps.value = res
      campsInDropdown.value = res
      resolve()
    })
  })
}

const showBookButton = ref(false)

const clickOnViewCart = () => {
  basketDialog.value = true
}

const basketDialog = ref(false)

watch(
  [() => itineraryReservation.value.selectedRegions],
  () => {
    updateParks()
  },
  { deep: true }
)

watch(
  [() => itineraryReservation.value.selectedCamps],
  () => {
    updateReservations()
  },
  { deep: true }
)

watch(
  [() => itineraryReservation.value.arrivalDate, () => itineraryReservation.value.departureDate],
  () => {
    updateReservations()
  },
  { deep: true }
)

const updatePropertiesOfReservations = () => {
  for (const reservation of itineraryReservation.value.reservations) {
    reservation.arrivalDate = itineraryReservation.value.arrivalDate
    reservation.departureDate = itineraryReservation.value.departureDate
  }
}

const updateReservations = () => {
  filterOutLeftOverReservations()
  addReservationToCamps()
  updatePropertiesOfReservations()
}

const filterOutLeftOverReservations = () => {
  for (const reservation of itineraryReservation.value.reservations) {
    const foundCamp = itineraryReservation.value.selectedCamps.find(
      (camp) => camp.name === reservation.propertyName
    )
    if (!foundCamp) {
      const index = itineraryReservation.value.reservations.indexOf(reservation)
      itineraryReservation.value.reservations.splice(index, 1)
    }
  }
}

const addReservationToCamps = () => {
  for (const camp of itineraryReservation.value.selectedCamps) {
    const foundReservation = itineraryReservation.value.reservations.find(
      (reservation) => reservation.propertyName === camp.name
    )
    if (!foundReservation) {
      addReservationToCamp(camp)
    }
  }
}

const addReservationToCamp = (camp: IProtelCamp) => {
  const reservation = new Reservation()
  reservation.propertyName = camp.name
  reservation.profileID = selectedProfile.value
  reservation.propertyID = camp.id
  reservation.arrivalDate = itineraryReservation.value.arrivalDate
  reservation.departureDate = itineraryReservation.value.departureDate
  itineraryReservation.value.reservations.push(reservation)
}

const travelDistanceShown = ref(false)
const travelDistanceWarningDialog = ref(false)

const isTravelDistanceTooFar = () => {
  const isTweeRivierenSelected = itineraryReservation.value.selectedCamps.some(
    (camp) => camp.name === 'Twee Riveren'
  )

  const isGharagabSelected = itineraryReservation.value.selectedCamps.some(
    (camp) => camp.name === 'Gharagab Wilderness Camp'
  )

  if (isTweeRivierenSelected && isGharagabSelected) {
    return true
  }
  return false
}

const checkTravelDistance = () => {
  if (isTravelDistanceTooFar() && !travelDistanceShown.value) {
    travelDistanceShown.value = true
    travelDistanceWarningDialog.value = true
  }
}

const clearSelectedCamps = () => {
  itineraryReservation.value.selectedCamps = []
  travelDistanceWarningDialog.value = false
}
</script>

<template>
  <v-container fluid class="bg-protelblue text-white itinerary-reservation-fixed-div">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100" cols="3">
        <v-autocomplete
          v-model="itineraryReservation.selectedRegions"
          clearable
          closable-chips
          chips
          label="Regions"
          :items="regionsInDropdown"
          item-title="name"
          return-object
          multiple
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex align-center h-100" cols="3">
        <v-autocomplete
          v-model="itineraryReservation.selectedParks"
          clearable
          closable-chips
          chips
          label="Parks"
          :items="parksInDropdown"
          item-title="name"
          return-object
          multiple
          @update:model-value="selectAllCampsInDropdown()"
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex align-center h-100" cols="6">
        <v-autocomplete
          v-model="itineraryReservation.selectedCamps"
          clearable
          closable-chips
          chips
          label="Camps"
          :items="campsInDropdown"
          item-title="name"
          return-object
          multiple
          @update:model-value="checkTravelDistance()"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <DateSelecter v-model="itineraryReservation.arrivalDate" label="Arrival"></DateSelecter>
      </v-col>
      <v-col class="d-flex align-center h-100">
        <DateSelecter v-model="itineraryReservation.departureDate" label="Departure"></DateSelecter>
      </v-col>
      <v-col>
        <ProfileSearchField
          label="Guest"
          icon-name="mdi-account-circle-outline"
          v-model="itineraryReservation.guestProfileID"
        ></ProfileSearchField>
      </v-col>
    </v-row>
  </v-container>

  <template v-for="camp of itineraryReservation.selectedCamps" :key="camp.id">
    <CampWithAvailabilities
      :camp="camp"
      :arrival-date="itineraryReservation.arrivalDate"
      :departure-date="itineraryReservation.departureDate"
    ></CampWithAvailabilities>
  </template>

  <v-container fluid>
    <div class="d-flex justify-end mt-3">
      <v-btn class="secondary-button me-2">Cancel</v-btn>

      <v-btn class="secondary-button me-2" @click="clickOnViewCart()">View Cart</v-btn>
      <v-btn class="primary-button" @click="clickOnAddToCart()">Add to Cart</v-btn>
    </div>
  </v-container>

  <v-dialog v-model="basketDialog" scrollable auto>
    <v-card>
      <BasketCard @close="basketDialog = false"></BasketCard>
    </v-card>
  </v-dialog>

  <v-dialog v-model="travelDistanceWarningDialog" scrollable>
    <v-toolbar class="standard-dialog-card-toolbar fixed-toolbar">
      <v-toolbar-title><span class="text-primary">Warning</span></v-toolbar-title>
      <div
        class="profiles-card-toolbar-button rounded-te"
        @click="travelDistanceWarningDialog = false"
      >
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-card class="rounded-t-0">
      <v-card-text>
        <div class="mb-3">Travel Distance is too far.</div>
        <div>Continue anyway?</div>

        <div class="d-flex justify-end">
          <v-btn @click="clearSelectedCamps()" class="me-2">Cancel</v-btn>

          <v-btn class="primary-button" @click="travelDistanceWarningDialog = false"
            >Continue</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
