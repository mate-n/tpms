<script setup lang="ts">
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { LanguageService } from '@/services/LanguageService'
import { SalutationService } from '@/services/SalutationService'
import type { ILanguage } from '@/shared/interfaces/ILanguage'
import type { ISalutation } from '@/shared/interfaces/ISalutation'
import type { AxiosStatic } from 'axios'
import { ValidityHelper } from '@/helpers/ValidityHelper'
import StationeryCard from '../stationeries/StationeryCard.vue'
import ReservationsCard from '../reservations/ReservationsCard.vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'
import { ReservationValidator } from '@/validators/ReservationValidator'
import { ReservationService } from '@/services/ReservationService'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { Profile } from '@/shared/classes/Profile'
import ProfileGeneralForm from '../profiles/ProfileGeneralForm.vue'
import ReservationCards from './ReservationCards.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IProtelAvailabilityPostBody } from '@/shared/interfaces/protel/IProtelAvailabilityPostBody'
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import { AvailabilityService } from '@/services/backend-middleware/AvailabilityService'
import { ProtelAvailabilitiesValidator } from '@/shared/validators/ProtelAvailabilitiesValidator'
const reservationClass = new Reservation()
const axios2: AxiosStatic | undefined = inject('axios2')
const reservationService = new ReservationService(axios2)
const profileService = new ProfileService(axios2)
const reservationValidator = new ReservationValidator()
const languageService = new LanguageService(axios2)
const salutationService = new SalutationService(axios2)
const validityHelper = new ValidityHelper()
const availabilityHelper = new AvailabilityHelper()
const availabilityService = new AvailabilityService(axios2)
const availabilityValidator = new ProtelAvailabilitiesValidator()
const props = defineProps({
  reservationInput: { type: Object as () => IReservation, required: true },
  crudOperation: { type: Number, required: true }
})
const isValidReservation = ref(true)
const reservationToBeEdited = ref<IReservation>(new Reservation())
const profileAssociatedWithReservation = ref<IProfile>(new Profile())
const emit = defineEmits(['save'])
const languages: Ref<ILanguage[]> = ref([])
const salutations: Ref<ISalutation[]> = ref([])

onMounted(() => {
  languageService.getAvailableLanguages().then((response) => {
    languages.value = response
  })
  salutationService.getAvailableSalutations().then((response) => {
    salutations.value = response
  })
  getReservationWithProfilePromise()
})

const getReservationWithProfilePromise = () => {
  return new Promise((resolve, reject) => {
    reservationToBeEdited.value = reservationClass.clone(props.reservationInput)

    if (reservationToBeEdited.value.guestProfileID) {
      profileService.get(reservationToBeEdited.value.guestProfileID).then((response) => {
        if (response) {
          profileAssociatedWithReservation.value = response
          resolve(response)
        } else {
          reject()
        }
      })
    }
  })
}

const checkReservationAvailable = () => {
  const protelAvailabilityPostBody: IProtelAvailabilityPostBody = availabilityHelper.mapPostBody({
    // propertyId: reservationToBeEdited.value.propertyID,
    propertyId: 19197,
    arrivalDate: reservationToBeEdited.value.arrivalDate,
    departureDate: reservationToBeEdited.value.departureDate,
    // roomTypeCode: reservationToBeEdited.value.roomTypeCode,
    roomTypeCode: 'Family Cottage FA4S',
    guestsPerRoom: reservationToBeEdited.value.guestsPerRoom
  })

  availabilityService.getAvailabilities(protelAvailabilityPostBody).then((availabilities) => {
    const hasInvalidAvailabilities = availabilities.some(
      (avalability) => !!availabilityValidator.validate(avalability)
    )
    isValidReservation.value = !hasInvalidAvailabilities
  })
}

watch(
  [() => reservationToBeEdited],
  () => {
    checkReservationAvailable()
  },
  { deep: true }
)

watch(props, () => {
  getReservationWithProfilePromise()
})

const validate = () => {
  reservationValidator.validate(reservationToBeEdited.value)
}

const save = () => {
  validate()
  if (
    reservationToBeEdited.value.errors &&
    Object.keys(reservationToBeEdited.value.errors).length > 0
  ) {
    return
  }
  if (props.crudOperation === CrudOperations.Create) {
    reservationService.post(reservationToBeEdited.value)
  } else if (props.crudOperation === CrudOperations.Update) {
    reservationService.put(reservationToBeEdited.value)
  }
  emit('save', reservationToBeEdited.value)
}

const stationeryCardDialog = ref(false)
const reservationsCardDialog = ref(false)
</script>
<template>
  <v-toolbar class="bg-primary">
    <v-toolbar-title
      ><v-icon>mdi-account-circle-outline</v-icon>
      {{ profileAssociatedWithReservation.name }}
      {{ profileAssociatedWithReservation.surname }}</v-toolbar-title
    >
  </v-toolbar>
  <ProfileGeneralForm
    :crudOperation="crudOperation"
    v-model="profileAssociatedWithReservation"
  ></ProfileGeneralForm>
  <v-toolbar class="bg-lightgray">
    <div class="h-100 d-flex px-5 align-center me-auto font-size-rem-14">
      Reservations <v-icon class="mx-3" size="x-small">mdi-arrow-right</v-icon> #{{
        reservationToBeEdited.id
      }}
    </div>
    <div v-if="isValidReservation" class="h-100 d-flex px-5 align-center">
      <v-btn
        v-if="validityHelper.isValid(reservationToBeEdited)"
        class="primary-button text-uppercase"
        @click="save()"
        >{{ $t('actions.save') }}</v-btn
      >
    </div>
    <v-tooltip text="Reservation color">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-circle</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Wake-up calls">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-phone</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Tax Override">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-percent-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Credit card management">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-credit-card-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Fixed Charges">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-calendar-range-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="Routing">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-hub</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="Policies">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-gavel</v-icon>
        </v-btn>
      </template>
    </v-tooltip>

    <v-tooltip text="External Link">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-link</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-btn v-bind="props" icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>

  <div v-if="!isValidReservation" class="px-4 py-2 mb-4 text-red-darken-1 text-h6">
    Invalid reservation
  </div>

  <ReservationCards v-model="reservationToBeEdited"></ReservationCards>

  <v-dialog v-model="stationeryCardDialog" scrollable>
    <v-card>
      <StationeryCard @close="stationeryCardDialog = false" />
    </v-card>
  </v-dialog>

  <v-dialog v-model="reservationsCardDialog" scrollable>
    <v-card>
      <ReservationsCard @close="reservationsCardDialog = false" />
    </v-card>
  </v-dialog>
</template>
