<script setup lang="ts">
import { computed, inject, onBeforeMount, ref, watch, type Ref } from 'vue'
import { DateHelper } from '@/helpers/DateHelper'
import { ReservationValidator } from '@/validators/ReservationValidator'
import AvailabilityService from '@/services/AvailabilityService'
import { RoomService } from '@/services/RoomService'
import { CampService } from '@/services/protel/CampService'
import type { AxiosStatic } from 'axios'
import ProfileSearch from './profiles/ProfileSearch.vue'
import ProfileService from '@/services/ProfileService'
import { AvailabilityService as ProtelAvailabilityService } from '@/services/protel/AvailabilityService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { IPropertyAvailability } from '@/shared/interfaces/availability/IPropertyAvailability'
import type { IPropertyAvailabilitySearch } from '@/shared/interfaces/availability/IPropertyAvailabilitySearch'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileSearch } from '@/shared/interfaces/profiles/IProfileSearch'
import type { ICamp } from '@/shared/interfaces/ICamp'
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
const dateFormatter = new DateFormatter()
const axios: AxiosStatic | undefined = inject('axios')
const availabilityService = new AvailabilityService(axios)
const campService = new CampService(axios)
const profileService = new ProfileService(axios)
const roomService = new RoomService(axios)
const protelAvailabilityService = new ProtelAvailabilityService(axios)
const dateHelper = new DateHelper()
const reservationValidator = new ReservationValidator()
const emit = defineEmits(['check', 'change', 'remove'])
const reservation = defineModel({ required: true, type: Object as () => IReservation })
const props = defineProps({
  previousReservation: { type: Object as () => IReservation, required: false },
  nextReservation: { type: Object as () => IReservation, required: false }
})
const campsInDropdown: Ref<ICamp[]> = ref([])
const roomsInDropdown: Ref<IRoom[]> = ref([])
const profilesInDropdown: Ref<IProfile[]> = ref([])
const profileDialog = ref(false)

onBeforeMount(() => {
  campService.findAll().then((response: ICamp[]) => {
    campsInDropdown.value = response
  })

  roomService.getAll().then((response: IRoom[]) => {
    roomsInDropdown.value = response
  })

  const profileSearch: IProfileSearch = {}
  profileService.search(profileSearch).then((response: IProfile[]) => {
    profilesInDropdown.value = response
  })
})

const getRoomsForDropdown = () => {
  roomsInDropdown.value = []
  for (const availability of reservation.value.protelAvailabilities) {
    const room: IRoom = {
      name: availability.room_type_name,
      code: availability.room_type_code,
      type: 0,
      minOccupancy: 0,
      maxOccupancy: availability.max_occupancy,
      description: availability.id,
      id: 0
    }
    roomsInDropdown.value.push(room)
  }
}

const arrivalDateMenu = ref(false)
const arrivalDateMin = computed(() => {
  if (props.previousReservation) {
    return dateHelper.getDateStringForInput(props.previousReservation.departureDate)
  }
  return dateHelper.getDateString(new Date())
})
const arrivalDateMax = computed(() => {
  return dateHelper.getDateStringForInput(reservation.value.departureDate)
})
const departureDateMenu = ref(false)
const departureDateMin = computed(() => {
  return dateHelper.getDateStringForInput(reservation.value.arrivalDate)
})
const departureDateMax = computed(() => {
  if (props.nextReservation) {
    return dateHelper.getDateStringForInput(props.nextReservation.arrivalDate)
  }
  return false
})

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservation.value.arrivalDate,
    reservation.value.departureDate
  )
})

const arrivalDateString = computed(() => {
  return dateHelper.getDateString(reservation.value.arrivalDate)
})

const departureDateString = computed(() => {
  return dateHelper.getDateString(reservation.value.departureDate)
})

const check = () => {
  reservationValidator.validate(reservation.value)
  if (!reservation.value.propertyID) return
  availabilitiesLoading.value = true
  const propertyAvailabilitySearch: IPropertyAvailabilitySearch = {
    propertyID: reservation.value.propertyID,
    availabilityStart: reservation.value.arrivalDate,
    availabilityEnd: reservation.value.departureDate,
    numberOfRooms: reservation.value.numberOfRooms,
    roomID: reservation.value.roomID,
    numberOfGuestsPerRoom: reservation.value.numberOfGuestsPerRoom,
    profileID: reservation.value.profileID
  }

  availabilityService
    .getAvailabilitiesByPropertyID(propertyAvailabilitySearch)
    .then((response: IPropertyAvailability[]) => {
      reservation.value.propertyAvailabilities = response
      reservation.value.baseRateCategory = 'Base Rate | Low Season'
      emit('check')
    })

  const protelAvailabilityPostBody: IProtelAvailabilityPostBody = {
    arrivaldate: dateFormatter.yyyydashmmdashdd(reservation.value.arrivalDate),
    departuredate: dateFormatter.yyyydashmmdashdd(reservation.value.departureDate),
    roomtype: 'null',
    propertyid: reservation.value.propertyID.toString(),
    detail: '0',
    accomodation_type: null
  }
  protelAvailabilityService.search(protelAvailabilityPostBody).then((response) => {
    const protelAvailabilities = response.filter((n) => n)
    reservation.value.protelAvailabilities = protelAvailabilities
    availabilitiesLoading.value = false
    getRoomsForDropdown()
  })
}

const reset = () => {
  reservation.value.reset()
}

const remove = (reservation: IReservation) => {
  emit('remove', reservation)
}

const emitChange = () => {
  reservationValidator.validate(reservation.value)
  emit('change')
}

const openProfileDialog = () => {
  profileDialog.value = true
}

const closeProfileDialog = () => {
  profileDialog.value = false
}

const profileSelected = (profile: IProfile) => {
  reservation.value.profileID = profile.id
  closeProfileDialog()
}

watch(
  [
    () => reservation.value.roomID,
    () => reservation.value.numberOfRooms,
    () => reservation.value.numberOfGuestsPerRoom,
    () => reservation.value.profileID,
    () => reservation.value.arrivalDate,
    () => reservation.value.departureDate,
    () => reservation.value.propertyID
  ],
  () => {
    const property = campsInDropdown.value.find((c) => c.campid === reservation.value.propertyID)
    if (property) {
      reservation.value.propertyName = property.campname
    }
    check()
  },
  { deep: true }
)

const showRemoveButton = computed(() => {
  if (!props.previousReservation && !props.nextReservation) {
    return false
  }

  if (!props.previousReservation && props.nextReservation) {
    return true
  }

  if (props.nextReservation) {
    return false
  }

  return true
})

const availabilitiesLoading = ref(false)

const selectProtelAvailability = (protelAvailability: IProtelAvailability) => {
  reservation.value.selectedProtelAvailability = protelAvailability
}
</script>

<template>
  <v-container fluid class="bg-white">
    <v-row class="d-flex align-center">
      <v-col class="d-flex align-center h-100">
        <v-select
          label=""
          :items="campsInDropdown"
          v-model="reservation.propertyID"
          item-title="campname"
          item-value="campid"
          :error-messages="reservation.errors && reservation.errors['propertyID']"
          @update:model-value="emitChange()"
        ></v-select>
        <v-icon>mdi-city</v-icon>
      </v-col>
      <v-col>
        <v-menu v-model="arrivalDateMenu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="arrivalDateString"
              label="Arrival"
              append-inner-icon="mdi-calendar"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-card>
            <v-date-picker
              :hide-header="true"
              v-model="reservation.arrivalDate"
              :min="arrivalDateMin"
              :max="arrivalDateMax"
              @update:model-value="emitChange()"
            >
            </v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field
          label="Nights"
          :model-value="numberOfNights"
          type="number"
          :error-messages="reservation.errors && reservation.errors['nights']"
          :readonly="true"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-menu v-model="departureDateMenu" :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="departureDateString"
              label="Departure"
              append-inner-icon="mdi-calendar"
              v-bind="props"
            ></v-text-field>
          </template>
          <v-card>
            <v-date-picker
              :hide-header="true"
              v-model="reservation.departureDate"
              :min="departureDateMin"
              :max="departureDateMax"
              @update:model-value="emitChange()"
            ></v-date-picker>
          </v-card>
        </v-menu>
      </v-col>
      <v-col>
        <v-text-field
          label="Rooms"
          v-model="reservation.numberOfRooms"
          :error-messages="reservation.errors && reservation.errors['numberOfRooms']"
          type="number"
          @change="emitChange()"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="Guests per room"
          v-model="reservation.numberOfGuestsPerRoom"
          :error-messages="reservation.errors && reservation.errors['numberOfGuestsPerRoom']"
          type="number"
          @change="emitChange()"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex">
        <v-autocomplete
          label="Guest"
          placeholder="Last Name | First Name"
          hint="Last Name | First Name"
          v-model="reservation.profileID"
          :items="profilesInDropdown"
          :item-title="(profile) => `${profile.lastName}, ${profile.firstName}`"
          :item-value="(profile) => profile.id"
          :disabled="previousReservation !== undefined"
          @update:model-value="emitChange()"
        ></v-autocomplete>
        <div class="d-flex align-center" @click="openProfileDialog()">
          <v-icon>mdi-magnify</v-icon>
        </div>
      </v-col>
      <v-col class="d-flex justify-space-between">
        <v-btn class="secondary-button mr-3" @click="reset()">Reset</v-btn>
        <v-btn class="danger-button" @click="remove(reservation)" v-if="showRemoveButton">
          Remove
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <template v-if="reservation.issues.length > 0">
    <v-container fluid>
      <div class="my-3">
        <div v-for="issue in reservation.issues" :key="issue">
          <v-alert type="warning" elevation="2">{{ issue }}</v-alert>
        </div>
      </div>
    </v-container>
  </template>

  <v-container fluid>
    <v-progress-linear
      v-if="availabilitiesLoading"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <v-table>
      <thead>
        <tr class="bg-lightblue">
          <th class="" style="width: 15rem"></th>
          <th
            v-for="protelAvailability of reservation.protelAvailabilities"
            :key="protelAvailability.transaction_id"
            class="text-center"
          >
            {{ protelAvailability.room_type_code }}
          </th>
          <template v-if="reservation.protelAvailabilities.length === 0">
            <th v-for="i in 12" :key="i"></th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="d-flex justify-space-between align-center">
            <v-icon class="text-primary">mdi-plus</v-icon>
            Availibility (incl. OB)
          </td>
          <td
            v-for="protelAvailability of reservation.protelAvailabilities"
            :key="protelAvailability.room_type_code"
            class="bg-lightgray"
          >
            <div
              class="bg-white mr-3 px-5 py-2 my-2 text-center"
              :class="{
                'bg-primary':
                  reservation.selectedProtelAvailability &&
                  protelAvailability.id === reservation.selectedProtelAvailability.id
              }"
              @click="selectProtelAvailability(protelAvailability)"
            >
              {{ protelAvailability.availability_count }}
            </div>
          </td>
          <template v-if="reservation.protelAvailabilities.length === 0">
            <td v-for="i in 12" :key="i" class="bg-lightgray">
              <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
                <v-icon>mdi-circle-small</v-icon>
              </div>
            </td>
          </template>
        </tr>
        <tr>
          <td class="d-flex justify-end align-center">
            {{ reservation.baseRateCategory }}
          </td>
          <td
            v-for="protelAvailability of reservation.protelAvailabilities"
            :key="protelAvailability.transaction_id"
            class="bg-lightgray"
          >
            <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
              <template v-if="protelAvailability.rates_data[0].room_rate">
                {{ protelAvailability.rates_data[0].room_rate }}
              </template>
            </div>
          </td>
          <template v-if="reservation.protelAvailabilities.length === 0">
            <td v-for="i in 12" :key="i" class="bg-lightgray">
              <div class="bg-white mr-3 px-5 py-2 my-2 text-center">
                <v-icon>mdi-circle-small</v-icon>
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <v-dialog v-model="profileDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearch
        @close="closeProfileDialog()"
        @profile-selected="(profile) => profileSelected(profile)"
      ></ProfileSearch>
    </v-card>
  </v-dialog>
</template>
