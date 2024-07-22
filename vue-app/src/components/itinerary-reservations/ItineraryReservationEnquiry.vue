<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import BasketCard from '@/components/baskets/BasketCard.vue'
import type { IProtelRegion } from '@/shared/interfaces/protel/IProtelRegion'
import type { AxiosStatic } from 'axios'
import type { IProtelPark } from '@/shared/interfaces/protel/IProtelPark'
import type { IProtelCamp } from '@/shared/interfaces/protel/IProtelCamp'
import DateSelecter from '@/components/dates/DateSelecter.vue'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import { RegionService } from '@/services/backend-middleware/RegionService'
import { ParkService } from '@/services/backend-middleware/ParkService'
import { CampService } from '@/services/backend-middleware/CampService'
import { AvailabilityService } from '@/services/backend-middleware/AvailabilityService'
import CampWithAvailabilities from './CampWithAvailabilities.vue'
import ItineraryReservationRightbar from './itinerary-reservation-rightbar/ItineraryReservationRightbar.vue'
import { type IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import { ProtelAvailabilityConverter } from '@/shared/converters/ProtelAvailabilityConverter'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IProtelReservationSelectUpdate } from '@/shared/interfaces/IProtelReservationSelectUpdate'
import { DateHelper } from '@/helpers/DateHelper'
import { ItineraryReservationCartManager } from '@/helpers/ItineraryReservationCartManager'
import { CartService } from '@/services/backend-middleware/CartService'
import type { CreateCartResponseBody } from '@/shared/interfaces/cart/CreateCartResponseBody'
import { GuestsPerRoom } from '@/shared/classes/GuestsPerRoom'
import { SyncCartItemService } from '@/services/backend-middleware/SyncCartItemService'
const protelAvailabilityConverter = new ProtelAvailabilityConverter()
const availabilityHelper = new AvailabilityHelper()
const dateHelper = new DateHelper()
const regionsInDropdown: Ref<IProtelRegion[]> = ref([])
const allParks: Ref<IProtelPark[]> = ref([])
const parksInDropdown: Ref<IProtelPark[]> = ref([])
const allCamps: Ref<IProtelCamp[]> = ref([])
const campsInDropdown: Ref<IProtelCamp[]> = ref([])
const roomTypeCodesInDropdown: Ref<string[]> = ref([])
const autoToggleRightBar = ref(true)
const showRightBar = ref(false)
const itineraryReservationCartStore = useItineraryReservationCartStore()
const axios2: AxiosStatic | undefined = inject('axios2')
const cartService = new CartService(axios2)
const syncCartItemService = new SyncCartItemService(axios2)
const regionService = new RegionService(axios2)
const parkService = new ParkService(axios2)
const campService = new CampService(axios2)
const availabilityService = new AvailabilityService(axios2)
const itineraryReservation = ref(new ItineraryReservation())
const arrivalDateNextDay = ref(dateHelper.addDays(itineraryReservation.value.arrivalDate, 1))
const itineraryReservationCartManager = new ItineraryReservationCartManager()

const clickOnCreateCartButton = () => {
  showRightBar.value = false
  autoToggleRightBar.value = true
  closeExpansionPanels.value++
  itineraryReservationCartStore.setItineraryReservation(itineraryReservation.value)
  itineraryReservationCartManager
    .createCart('0', cartService)
    .then((createCartResponseBody: CreateCartResponseBody) => {
      itineraryReservationCartStore.setCartNumber(createCartResponseBody.cart_number)
      syncCartItemService.synchronizeFrontendCartWithBackendCart(
        itineraryReservation.value,
        createCartResponseBody.cart_number
      )
    })
}

const clickOnUpdateCartButton = () => {
  const cartNumber = itineraryReservationCartStore.getCartNumber()
  if (!cartNumber) {
    return
  }

  showRightBar.value = false
  autoToggleRightBar.value = true
  closeExpansionPanels.value++

  syncCartItemService.synchronizeFrontendCartWithBackendCart(itineraryReservation.value, cartNumber)
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
const getRoomTypes = () => {
  roomTypeCodesInDropdown.value = []

  const promises = itineraryReservation.value.selectedCamps.map((camp: IProtelCamp) => {
    const protelAvailabilityPostBody = availabilityHelper.mapPostBody({
      camp,
      arrivalDate: itineraryReservation.value.arrivalDate,
      departureDate: itineraryReservation.value.departureDate,
      guestsPerRoom: new GuestsPerRoom()
    })
    return availabilityService.getAvailabilities(protelAvailabilityPostBody)
  })

  Promise.all(promises).then((response: IProtelAvailability[][]) => {
    const roomTypeCodeSet = new Set<string>()
    response.forEach((availabilities) => {
      availabilities.forEach((availability) => {
        if (availability?.room_type_code) {
          roomTypeCodeSet.add(availability.room_type_code)
        }
      })
    })
    roomTypeCodesInDropdown.value = Array.from(roomTypeCodeSet.values())
  })
}

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
    getRoomTypes()
    updateReservations()
  },
  { deep: true }
)

watch(
  [
    () => itineraryReservation.value.arrivalDate,
    () => itineraryReservation.value.departureDate,
    () => itineraryReservation.value.roomTypeCode
  ],
  () => {
    arrivalDateNextDay.value = dateHelper.addDays(itineraryReservation.value.arrivalDate, 1)

    const isAfter = dateHelper.isAfter(
      dateHelper.addDays(itineraryReservation.value.arrivalDate, 1),
      itineraryReservation.value.departureDate
    )
    if (isAfter) {
      itineraryReservation.value.departureDate = dateHelper.addDays(
        itineraryReservation.value.arrivalDate,
        1
      )
    }

    updateReservations()
  },
  { deep: true }
)

const updateReservations = () => {
  itineraryReservation.value.protelReservations = []
  filterOutLeftOverReservations()
}

const filterOutLeftOverReservations = () => {
  for (const reservation of itineraryReservation.value.protelReservations) {
    const foundCamp = itineraryReservation.value.selectedCamps.find(
      (camp) => camp.name === reservation.property_code
    )
    if (!foundCamp) {
      const index = itineraryReservation.value.protelReservations.indexOf(reservation)
      itineraryReservation.value.protelReservations.splice(index, 1)
    }
  }
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

const availabilitiesSelected = (protelReservationSelectUpdate: IProtelReservationSelectUpdate) => {
  if (autoToggleRightBar.value) {
    showRightBar.value = true
    autoToggleRightBar.value = false
  }

  const newReservations = protelAvailabilityConverter.convertToReservations(
    protelReservationSelectUpdate.selectedAvailabilities,
    protelReservationSelectUpdate.guestsPerRoom
  )

  itineraryReservation.value.protelReservations =
    itineraryReservation.value.protelReservations.filter(
      (reservation) =>
        !hasReservationPropertyCodeAndRoomTypeCode(
          reservation,
          protelReservationSelectUpdate.property_code,
          protelReservationSelectUpdate.roomTypeCode
        )
    )

  itineraryReservation.value.protelReservations.push(...newReservations)
}

const hasReservationPropertyCodeAndRoomTypeCode = (
  reservation: IProtelReservation,
  property_code: string,
  roomTypeCode: string
) => {
  if (roomTypeCode === '') {
    return reservation.property_code === property_code
  }

  return reservation.property_code === property_code && reservation.type_code === roomTypeCode
}

const isCartNumberPresent = computed(() => {
  return itineraryReservationCartStore.getCartNumber() !== undefined
})
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
          data-cy="camp_autocomplete"
        ></v-autocomplete>
      </v-col>
    </v-row>

    <div class="d-flex align-center ga-4">
      <v-row class="d-flex align-center">
        <v-col class="d-flex align-center h-100">
          <DateSelecter
            v-model="itineraryReservation.arrivalDate"
            label="Arrival"
            data-cy="arrival_date_selector"
          ></DateSelecter>
        </v-col>
        <v-col class="d-flex align-center h-100">
          <DateSelecter
            v-model="itineraryReservation.departureDate"
            label="Departure"
            :min="arrivalDateNextDay"
          ></DateSelecter>
        </v-col>
        <v-col>
          <v-autocomplete
            v-model="itineraryReservation.selectedRoomTypeCodes"
            clearable
            closable-chips
            chips
            variant="underlined"
            label="Room types"
            :items="roomTypeCodesInDropdown"
            multiple
          ></v-autocomplete>
        </v-col>
      </v-row>

      <ItineraryReservationRightbar
        :showRightBar="showRightBar"
        :itinerary-reservation="itineraryReservation"
        @toggle="(bol) => (showRightBar = bol)"
        @update="(val) => (itineraryReservation.protelReservations = val)"
      />
    </div>
  </v-container>

  <template v-for="camp of itineraryReservation.selectedCamps" :key="camp.id">
    <CampWithAvailabilities
      :camp="camp"
      :arrival-date="itineraryReservation.arrivalDate"
      :departure-date="itineraryReservation.departureDate"
      :room-type-codes="itineraryReservation.selectedRoomTypeCodes"
      @availabilities-selected="
        (protelReservationSelectUpdate: IProtelReservationSelectUpdate) =>
          availabilitiesSelected(protelReservationSelectUpdate)
      "
      :itinerary-reservation="itineraryReservation"
    ></CampWithAvailabilities>
  </template>

  <v-container fluid>
    <div class="d-flex justify-end mt-3">
      <v-btn class="secondary-button me-2">Cancel</v-btn>

      <v-btn class="secondary-button me-2" @click="clickOnViewCart()">View Cart</v-btn>
      <v-btn class="primary-button" @click="clickOnCreateCartButton()" v-if="!isCartNumberPresent">
        Create Cart
      </v-btn>
      <v-btn class="primary-button" @click="clickOnUpdateCartButton()" v-if="isCartNumberPresent">
        Update Cart
      </v-btn>
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
