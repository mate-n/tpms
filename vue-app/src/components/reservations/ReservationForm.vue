<script setup lang="ts">
import { inject, onMounted, ref, watch, type Ref } from 'vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
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
import ProfileService from '@/services/ProfileService'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { Profile } from '@/shared/classes/Profile'
import ProfileAvatar from '../profiles/ProfileAvatar.vue'
import PrivateProfileForm from '../profiles/PrivateProfileForm.vue'
import CompanyProfileForm from '../profiles/CompanyProfileForm.vue'
import TravelAgencyProfileForm from '../profiles/TravelAgencyProfileForm.vue'

const axios: AxiosStatic | undefined = inject('axios')
const reservationService = new ReservationService(axios)
const profileService = new ProfileService(axios)
const reservationValidator = new ReservationValidator()
const languageService = new LanguageService(axios)
const salutationService = new SalutationService(axios)
const cloneHelper = new CloneHelper()
const validityHelper = new ValidityHelper()
const props = defineProps({
  reservationInput: { type: Object as () => IReservation, required: true },
  crudOperation: { type: Number, required: true }
})
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
  return new Promise((resolve) => {
    reservationToBeEdited.value = cloneHelper.clone(props.reservationInput)

    if (reservationToBeEdited.value.guestProfileID) {
      profileService.get(reservationToBeEdited.value.guestProfileID).then((response) => {
        console.log(response)
        profileAssociatedWithReservation.value = response
        resolve(response)
      })
    }
  })
}

watch(props, (newInput) => {
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
      {{ profileAssociatedWithReservation.firstName }}
      {{ profileAssociatedWithReservation.lastName }}</v-toolbar-title
    >
  </v-toolbar>
  <v-container fluid class="bg-white">
    <v-row>
      <v-col cols="2">
        <div class="my-2">
          <ProfileAvatar
            v-model="profileAssociatedWithReservation"
            :crud-operation="crudOperation"
          ></ProfileAvatar>
        </div>
      </v-col>
      <v-col cols="10" class="border-s">
        <div v-if="profileAssociatedWithReservation.profileType === 'Private'">
          <PrivateProfileForm
            v-model="profileAssociatedWithReservation"
            @change="validate()"
          ></PrivateProfileForm>
        </div>
        <div
          v-if="
            profileAssociatedWithReservation.profileType === 'Company' ||
            profileAssociatedWithReservation.profileType === 'Group' ||
            profileAssociatedWithReservation.profileType === 'Source'
          "
        >
          <CompanyProfileForm
            v-model="reservationToBeEdited"
            @change="validate()"
          ></CompanyProfileForm>
        </div>
        <div v-if="profileAssociatedWithReservation.profileType === 'TravelAgency'">
          <TravelAgencyProfileForm
            v-model="reservationToBeEdited"
            @change="validate()"
          ></TravelAgencyProfileForm>
        </div>
      </v-col>
    </v-row>
  </v-container>
  <v-toolbar class="bg-lightgray">
    <div class="h-100 d-flex px-5 align-center me-auto font-size-rem-14">
      Reservations <v-icon class="mx-3" size="x-small">mdi-arrow-right</v-icon> #{{
        reservationToBeEdited.id
      }}
    </div>
    <div class="h-100 d-flex px-5 align-center">
      <v-btn
        v-if="validityHelper.isValid(reservationToBeEdited)"
        class="primary-button text-uppercase"
        @click="save()"
        >{{ $t('actions.save') }}</v-btn
      >
    </div>
    <v-tooltip text="Stationery">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-circle</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Stationery">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-phone</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Stationery">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-percent-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="Stationery">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon class="profiles-icon-button">
          <v-icon>mdi-credit-card-outline</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </v-toolbar>
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Stay Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Room Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Rate Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Segmentation</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Linked Profiles</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Traces</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Notes</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">User Defined</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Attachments</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
      <v-col class="pr-0 profiles-card-column">
        <div class="profiles-card">
          <v-toolbar class="profiles-card-toolbar">
            <v-toolbar-title><span class="text-primary">Billing</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="profiles-card-divider"></v-divider>
          <v-container> </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>

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
