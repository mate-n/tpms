<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { ItineraryReservationValidator } from '@/validators/ItineraryReservationValidator'
import { useBasketItemsStore } from '@/stores/basketItems'
import { Reservation } from '@/shared/classes/Reservation'
import ReservationFormInEnquiry from './ReservationFormInEnquiry.vue'
import BasketCard from '@/components/baskets/BasketCard.vue'
import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import type { AxiosStatic } from 'axios'
import { ProtelRegionService } from '@/services/protel/ProtelRegionService'
import { ProtelParkService } from '@/services/protel/ProtelParkService'
import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import type { IProtelParkSearch } from '@/shared/interfaces/protel/IProtelParkSearch'
import { ProtelCampService } from '@/services/protel/ProtelCampService'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import type { IProtelCampSearch } from '@/shared/interfaces/protel/IProtelCampSearch'
import DateSelecter from '@/components/dates/DateSelecter.vue'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import ProfileSearchField from '@/components/profiles/ProfileSearchField.vue'
const regions: Ref<IProtelRegion[]> = ref([])
const parks: Ref<IProtelPark[]> = ref([])
const camps: Ref<IProtelCamp[]> = ref([])
const basketItemsStore = useBasketItemsStore()
const itineraryReservationValidator = new ItineraryReservationValidator()
const axios: AxiosStatic | undefined = inject('axios')
const protelRegionService = new ProtelRegionService(axios)
const protelParkService = new ProtelParkService(axios)
const protelCampService = new ProtelCampService(axios)
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
  for (const reservation of itineraryReservation.value.reservations) {
    basketItemsStore.addReservation(reservation)
  }
}

const closeExpansionPanels = ref(0)

onBeforeMount(() => {
  getRegions()
  getParks()
  getCamps()
})

const getRegions = () => {
  protelRegionService.findAll().then((res) => {
    regions.value = res
  })
}

const getParks = () => {
  if (itineraryReservation.value.selectedRegions.length === 0) {
    protelParkService.findAll().then((res) => {
      parks.value = res
    })
  } else {
    const protelParkSearch: IProtelParkSearch = {
      regionNames: itineraryReservation.value.selectedRegions.map((region) => region.name)
    }
    protelParkService.search(protelParkSearch).then((res) => {
      parks.value = res
    })
  }
}

const getCamps = () => {
  if (itineraryReservation.value.selectedParks.length === 0) {
    protelCampService.findAll().then((res) => {
      camps.value = res
    })
  } else {
    const protelCampSearch: IProtelCampSearch = {
      parkNames: itineraryReservation.value.selectedParks.map((park) => park.name)
    }
    protelCampService.search(protelCampSearch).then((res) => {
      camps.value = res
    })
  }
}

const showBookButton = ref(false)

const clickOnViewCart = () => {
  basketDialog.value = true
}

const basketDialog = ref(false)

watch(
  [() => itineraryReservation.value.selectedRegions],
  () => {
    getParks()
  },
  { deep: true }
)

watch(
  [() => itineraryReservation.value.selectedParks],
  () => {
    getCamps()
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
  reservation.propertyID = 1
  reservation.arrivalDate = itineraryReservation.value.arrivalDate
  reservation.departureDate = itineraryReservation.value.departureDate
  itineraryReservation.value.reservations.push(reservation)
}
</script>

<template>
  <v-container fluid class="bg-protelblue text-white itinerary-reservation-fixed-div-1">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <v-autocomplete
          v-model="itineraryReservation.selectedRegions"
          clearable
          chips
          label="Regions"
          :items="regions"
          item-title="name"
          return-object
          multiple
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex align-center h-100">
        <v-autocomplete
          v-model="itineraryReservation.selectedParks"
          clearable
          chips
          label="Parks"
          :items="parks"
          item-title="name"
          return-object
          multiple
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex align-center h-100">
        <v-autocomplete
          v-model="itineraryReservation.selectedCamps"
          clearable
          chips
          label="Camps"
          :items="camps"
          item-title="name"
          return-object
          multiple
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-container>

  <v-container fluid class="bg-protelblue text-white itinerary-reservation-fixed-div-2">
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
          :profile-search-input="{
            guestTypeID: 4
          }"
          v-model="itineraryReservation.guestProfileID"
        ></ProfileSearchField>
      </v-col>
    </v-row>
  </v-container>

  <template v-for="(reservation, i) of itineraryReservation.reservations" :key="reservation.id">
    <ReservationFormInEnquiry
      v-model="itineraryReservation.reservations[i]"
      @check="checkForIssues()"
      @change="onReservationChanged()"
      :previous-reservation="itineraryReservation.reservations[i - 1]"
      :next-reservation="itineraryReservation.reservations[i + 1]"
      :collapse-expansion="closeExpansionPanels"
    ></ReservationFormInEnquiry>
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
</template>
