<script setup lang="ts">
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { GuestsPerRoomHelper } from '@/helpers/GuestsPerRoomHelper'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import ProfileService from '@/services/ProfileService'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'
import type { AxiosStatic } from 'axios'
import { computed, inject, onBeforeMount, ref, watch, type Ref } from 'vue'
import TicketsTable from '../tickets/TicketsTable.vue'
import TicketsCard from '../tickets/TicketsCard.vue'
import ProfileSearchCard from '../profiles/ProfileSearchCard.vue'
import { ProfileHelper } from '@/helpers/ProfileHelper'
import { useBasketItemsStore } from '@/stores/basketItems'
const profileHelper = new ProfileHelper()
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
const priceFormatter = new PriceFormatter()
const dateFormatter = new DateFormatter()
const availabilityGroupHelper = new AvailabilityGroupHelper()
const guestsPerRoomHelper = new GuestsPerRoomHelper()
const dateHelper = new DateHelper()
const basketItemsStore = useBasketItemsStore()

const availabilityGroup = defineModel({
  required: true,
  type: Object as () => IProtelAvailabilityGroup
})

onBeforeMount(() => {
  availabilityGroupHelper.sortByDate(availabilityGroup.value)
})

const arrivalDate = computed(() => {
  return availabilityGroupHelper.getArrivalDate(availabilityGroup.value)
})

const departureDate = computed(() => {
  return availabilityGroupHelper.getDepartureDate(availabilityGroup.value)
})

const profilesInDropdown: Ref<IProfile[]> = ref([])
onBeforeMount(() => {
  profileService.findAll().then((response: IProfile[]) => {
    profilesInDropdown.value = response
  })
})

const emitChange = () => {
  if (availabilityGroup.value.profileID) {
    profileService.get(availabilityGroup.value.profileID).then((response) => {
      changeProfileOfReservations(response)
    })
  }
}

const profileDialog = ref(false)
const profile: Ref<IProfile | undefined> = ref(undefined)
const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    availabilityGroupHelper.getArrivalDate(availabilityGroup.value),
    availabilityGroupHelper.getDepartureDate(availabilityGroup.value)
  )
})

const chargesLabel = computed(() => {
  return availabilityGroup.value.tickets.length > 0 ? 'Charges' : 'No Charges'
})

const clickOnAddFixedCharges = () => {
  ticketsCardDialog.value = true
}
const ticketsCardDialog = ref(false)
const conservationFeesDialog = ref(false)

const addTicketsToReservation = () => {
  ticketsCardDialog.value = false
}

const profileSelected = (selectedProfile: IProfile) => {
  changeProfileOfReservations(selectedProfile)
  profileDialog.value = false
}

const changeProfileOfReservations = (newProfile: IProfile) => {
  profile.value = newProfile
  profileHelper.changeProfile(availabilityGroup.value, newProfile)

  const availabilityGroupsOfOtherReservations =
    availabilityGroupHelper.getAvailabilityGroupsFromReservations(basketItemsStore.reservations)

  for (const availabilityGroupOfOtherReservation of availabilityGroupsOfOtherReservations) {
    profileHelper.changeProfile(availabilityGroupOfOtherReservation, newProfile)
  }
}

watch(
  () => availabilityGroup.value.profileID,
  (newValue) => {
    if (newValue) {
      profileService.get(newValue).then((response) => {
        profile.value = response
      })
    }
  }
)
</script>

<template>
  <v-card class="mb-5">
    <v-card-text class="px-0">
      <div class="d-flex justify-space-between align-center">
        <div class="ms-2 pb-3">
          <v-icon>mdi-chevron-double-right</v-icon
          ><strong>{{ availabilityGroup.availabilities[0].park_name }}</strong>
        </div>
        <div class="d-flex align-center" style="min-width: 50%">
          <v-autocomplete
            label="Guest"
            v-model="availabilityGroup.profileID"
            placeholder="Last Name | First Name"
            hint="Last Name | First Name"
            :items="profilesInDropdown"
            :item-title="(profile: IProfile) => `${profile.lastName}, ${profile.firstName}`"
            :item-value="(profile: IProfile) => profile.id"
            @update:model-value="emitChange()"
          ></v-autocomplete>
          <div class="d-flex align-center" @click="profileDialog = true">
            <v-icon>mdi-magnify</v-icon>
          </div>
        </div>
        <div></div>
      </div>
      <div class="bg-lightblue py-3">
        <div class="ms-2">
          <v-row>
            <v-col
              ><span class="standard-caption">Last Name</span><br />
              {{ profile?.lastName }}</v-col
            >
            <v-col>
              <span class="standard-caption">Arrival</span><br />
              {{
                dateFormatter.dddotmmdotyyyy(
                  availabilityGroupHelper.getArrivalDate(availabilityGroup)
                )
              }}
            </v-col>
            <v-col><span class="standard-caption">Nights</span><br />{{ numberOfNights }}</v-col>
            <v-col
              ><span class="standard-caption">Guests per room</span><br />{{
                guestsPerRoomHelper.getTotalNumberOfGuests(availabilityGroup.guestsPerRoom)
              }}
            </v-col>
            <v-col><span class="standard-caption">Email</span><br />{{ profile?.email }}</v-col>
          </v-row>
          <v-row>
            <v-col
              ><span class="standard-caption">First Name</span><br />{{ profile?.firstName }}</v-col
            >
            <v-col>
              <span class="standard-caption">Departure</span><br />
              {{
                dateFormatter.dddotmmdotyyyy(
                  availabilityGroupHelper.getDepartureDate(availabilityGroup)
                )
              }}
            </v-col>
            <v-col
              ><span class="standard-caption">Rooms</span><br />{{
                availabilityGroup.numberOfRooms
              }}</v-col
            >
            <v-col></v-col>
            <v-col><span class="standard-caption">Phone</span><br />{{ profile?.phone }}</v-col>
          </v-row>
          <v-row>
            <v-col>
              TOTAL RATE<br />
              <strong>{{
                priceFormatter.formatPrice(
                  availabilityGroupHelper.calculateTotalRate(availabilityGroup)
                )
              }}</strong></v-col
            >
            <v-col>
              AVERAGE RATE<br />
              {{
                priceFormatter.formatPrice(
                  availabilityGroupHelper.calculateAverageRate(availabilityGroup)
                )
              }}
            </v-col>
            <v-col></v-col>
            <v-col></v-col>
            <v-col class="d-flex"> </v-col>
          </v-row>
        </div>
      </div>
      <div class="ms-2 py-3">
        <div class="pb-3">
          <strong>{{ chargesLabel }}</strong>
        </div>
        <v-row>
          <v-col>
            <TicketsTable
              :tickets="availabilityGroup.tickets"
              :collapsible="true"
              :collapsed="true"
              :show-date="true"
              v-if="availabilityGroup.tickets.length > 0"
            />
          </v-col>
          <v-col class="d-flex align-end justify-end">
            <v-btn @click="clickOnAddFixedCharges()" class="me-2"> Add Additional </v-btn></v-col
          >
        </v-row>
      </div>
      <div class="ps-2 ma-0 py-3 bg-lightblue">
        <v-row>
          <v-col>
            TOTAL<br />
            <strong>
              {{
                priceFormatter.formatPrice(
                  availabilityGroupHelper.calculateTotalReservationPrice(availabilityGroup)
                )
              }}
            </strong></v-col
          >
          <v-col> </v-col>
          <v-col></v-col>
          <v-col></v-col>
          <v-col class="d-flex"> </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
  <v-dialog v-model="conservationFeesDialog" fullscreen scrollable>
    <v-card>
      <!--
            <ConservationFeesCard v-model="reservation" @close="conservationFeesDialog = false" />
      -->
    </v-card>
  </v-dialog>

  <v-dialog v-model="ticketsCardDialog" fullscreen scrollable>
    <v-card>
      <TicketsCard
        v-model="availabilityGroup"
        :arrival-date="arrivalDate"
        :departure-date="departureDate"
        :property-name="availabilityGroup.availabilities[0].park_name"
        @close="ticketsCardDialog = false"
        @add-tickets-to-reservation="addTicketsToReservation()"
      />
    </v-card>
  </v-dialog>

  <v-dialog v-model="profileDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearchCard
        @close="profileDialog = false"
        @profile-selected="(profile) => profileSelected(profile)"
      ></ProfileSearchCard>
    </v-card>
  </v-dialog>

  <v-dialog v-model="profileDialog" fullscreen scrollable>
    <v-card>
      <ProfileSearchCard
        @close="profileDialog = false"
        @profile-selected="(profile) => profileSelected(profile)"
      ></ProfileSearchCard>
    </v-card>
  </v-dialog>
</template>
