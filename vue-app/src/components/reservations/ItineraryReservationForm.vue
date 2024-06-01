<script setup lang="ts">
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject, onMounted, ref, watch } from 'vue'
import ProfileGeneralForm from '@/components/profiles/ProfileGeneralForm.vue'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import { CloneHelper } from '@/helpers/CloneHelper'
const cloneHelper = new CloneHelper()
const props = defineProps({
  itineraryReservationInput: { type: Object as () => IItineraryReservation, required: true }
})
const itineraryReservationToBeEdited = ref<IItineraryReservation>(new ItineraryReservation())
const profileAssociatedWithItineraryReservation = ref<IProfile>(new Profile())
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
onMounted(() => {
  cloneAndGetProfile()
})

const cloneAndGetProfile = () => {
  itineraryReservationToBeEdited.value = cloneHelper.clone(props.itineraryReservationInput)
  if (
    props.itineraryReservationInput.reservations.length > 0 &&
    props.itineraryReservationInput.reservations[0].id
  ) {
    profileService.get(props.itineraryReservationInput.reservations[0].id).then((res) => {
      profileAssociatedWithItineraryReservation.value = res
    })
  }
}

watch(props, () => {
  cloneAndGetProfile()
})
</script>
<template>
  <v-toolbar class="bg-primary">
    <v-toolbar-title
      ><v-icon>mdi-account-circle-outline</v-icon>
      {{ profileAssociatedWithItineraryReservation.firstName }}
      {{ profileAssociatedWithItineraryReservation.lastName }}</v-toolbar-title
    >
  </v-toolbar>
  <ProfileGeneralForm v-model="profileAssociatedWithItineraryReservation"></ProfileGeneralForm>
  <v-toolbar class="bg-lightgray">
    <div class="h-100 d-flex px-5 align-center me-auto font-size-rem-14">
      Itinerary Reservations <v-icon class="mx-3" size="x-small">mdi-arrow-right</v-icon> #{{
        itineraryReservationToBeEdited.id
      }}
    </div>
  </v-toolbar>
  <v-container fluid class="bg-lightgray pt-0">
    <v-row>
      <v-col class="pr-0 standard-card-column">
        <div class="standar-card">
          <v-toolbar class="standard-card-toolbar">
            <v-toolbar-title><span class="text-primary">Rate Details</span></v-toolbar-title>
          </v-toolbar>
          <v-divider class="standard-card-divider"></v-divider>
          <v-container> </v-container></div
      ></v-col>
    </v-row>
  </v-container>
</template>
