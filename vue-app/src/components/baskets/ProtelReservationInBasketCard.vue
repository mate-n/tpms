<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import { onBeforeMount } from 'vue'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { TicketService } from '@/services/TicketService'
import type { ITicket } from '@/shared/interfaces/ITicket'
import { GuestsPerRoomHelper } from '@/helpers/GuestsPerRoomHelper'
import ProfileSearchCard from '../profiles/ProfileSearchCard.vue'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import TicketsCard from '@/components/tickets/TicketsCard.vue'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import ConservationFeeForm from '@/components/conservation-fees/ConservationFeeForm.vue'
import { useItineraryReservationCartStore } from '@/stores/itineraryReservationCart'
import CartContentTable from '../carts/CartContentTable.vue'
import type { ICartContentItem } from '@/shared/interfaces/ICartContentItem'
import { CartContentItemConverter } from '@/shared/converters/CartContentItemConverter'
import type { IConservationFeePrices } from '@/shared/interfaces/IConservationFeePrices'
import { ConservationFeePricesHelper } from '@/helpers/ConservationFeePricesHelper'
import { RoomHelper } from '@/helpers/RoomHelper'
const conservationFeePricesHelper = new ConservationFeePricesHelper()
const roomHelper = new RoomHelper()
const cartContentItemConverter = new CartContentItemConverter()
const axios2: AxiosStatic | undefined = inject('axios2')
const priceFormatter = new PriceFormatter()
const emit = defineEmits([
  'profile-selected',
  'remove-reservation',
  'add-tickets-to-reservation',
  'add-conservation-fees-to-reservation'
])
const itineraryReservationCartStore = useItineraryReservationCartStore()

const props = defineProps({
  profile: {
    required: false,
    type: Object as () => IProfile
  }
})

const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const ticketsService = new TicketService()
const reservation = defineModel({ required: true, type: Object as () => IProtelReservation })

const profileService = new ProfileService(axios2)
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()
const guestsPerRoomHelper = new GuestsPerRoomHelper()
const profileDialog = ref(false)

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservation.value.arrivalDate,
    reservation.value.departureDate
  )
})

const removeReservation = (reservation: IProtelReservation) => {
  emit('remove-reservation', reservation)
}

const ticketsCardDialog = ref(false)

const clickOnAddFixedCharges = () => {
  ticketsCardDialog.value = true
}

const addTicketsToReservation = () => {
  const cartNumber = itineraryReservationCartStore.getCartNumber()
  if (!cartNumber) {
    return
  }
  emit('add-tickets-to-reservation')

  ticketsCardDialog.value = false
}

const availableTickets: Ref<ITicket[]> = ref([])

const chargesLabel = computed(() => {
  return reservation.value.tickets.length > 0 ? 'Charges' : 'No Charges'
})

const conservationFeesLabel = computed(() => {
  return !conservationFeePricesHelper.isEmpty(reservation.value.conservationFeePrices)
    ? 'Conservation Fees'
    : 'No Conservation Fees'
})

onMounted(() => {
  ticketsService.getAll().then((data) => {
    availableTickets.value = data
    for (const ticket of availableTickets.value) {
      ticket.Date = new Date()
    }
  })
})
const profilesInDropdown: Ref<IProfile[]> = ref([])
onBeforeMount(() => {
  profileService.getAll().then((response: IProfile[]) => {
    profilesInDropdown.value = response
  })
})

const profileSelected = (selectedProfile: IProfile) => {
  emit('profile-selected', selectedProfile)
  profileDialog.value = false
}

const selectedProfileInDropdown = ref<IProfile | undefined>(undefined)

const profileAutoCompleteUpdated = () => {
  if (selectedProfileInDropdown.value) {
    emit('profile-selected', selectedProfileInDropdown.value)
  }
}

const addConservationFeesToReservation = () => {
  const cartNumber = itineraryReservationCartStore.getCartNumber()
  if (!cartNumber) {
    return
  }

  emit('add-conservation-fees-to-reservation')
  conservationFeeFormDialog.value = false
}

watch(
  () => props.profile,
  (newInput: IProfile | undefined) => {
    if (newInput) {
      selectedProfileInDropdown.value = newInput
    }
  },
  { deep: true, immediate: true }
)

const conservationFeeFormDialog = ref(false)

const convertTicketsToCartContentItems = (tickets: ITicket[]): ICartContentItem[] => {
  return cartContentItemConverter.convertTicketsToCartContentItems(tickets)
}

const convertConservationFeesToCartContentItems = (
  conservationFeePrices: IConservationFeePrices
): ICartContentItem[] => {
  return cartContentItemConverter.convertConservationFeesToCartContentItems(conservationFeePrices)
}
</script>

<template>
  <v-card class="mb-5" data-cy="reservation_basket_card">
    <v-card-text class="px-0">
      <div class="d-flex justify-space-between align-center">
        <div class="ms-2 pb-3">
          <v-icon>mdi-chevron-double-right</v-icon>
          <strong data-cy="property_name">{{ reservation.property_name }}</strong
          ><br />
          <span class="text-black" data-cy="room_type_code">{{
            roomHelper.removeCloneRoomTypeCodeSuffix(reservation.roomTypeCode)
          }}</span>
        </div>
        <div class="d-flex align-center" style="min-width: 50%">
          <v-autocomplete
            label="Guest"
            v-model="selectedProfileInDropdown"
            placeholder="Last Name | First Name"
            hint="Last Name | First Name"
            :items="profilesInDropdown"
            :item-title="(profile: IProfile | undefined) => `${profile?.surname}, ${profile?.name}`"
            return-object
            @update:model-value="profileAutoCompleteUpdated()"
          ></v-autocomplete>
          <div class="d-flex align-center" @click="profileDialog = true">
            <v-icon>mdi-magnify</v-icon>
          </div>
        </div>
        <div>
          <v-icon class="text-gray me-2" @click="removeReservation(reservation)">
            mdi-delete-outline
          </v-icon>
        </div>
      </div>
      <div class="bg-lightblue py-3">
        <div class="ms-2">
          <v-row>
            <v-col
              ><span class="standard-caption">Last Name</span><br />
              {{ profile?.surname }}</v-col
            >
            <v-col>
              <span class="standard-caption">Arrival</span><br />
              <span data-cy="arrival_date">
                {{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }}
              </span>
            </v-col>
            <v-col><span class="standard-caption">Nights</span><br />{{ numberOfNights }}</v-col>
            <v-col
              ><span class="standard-caption">Guests per room</span><br />{{
                guestsPerRoomHelper.getTotalNumberOfGuests(reservation.guestsPerRoom)
              }}
            </v-col>
            <v-col><span class="standard-caption">Email</span><br />{{ profile?.email }}</v-col>
          </v-row>
          <v-row>
            <v-col><span class="standard-caption">First Name</span><br />{{ profile?.name }}</v-col>
            <v-col>
              <span class="standard-caption">Departure</span><br />
              <span data-cy="departure_date">
                {{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}
              </span>
            </v-col>
            <v-col
              ><span class="standard-caption">Rooms</span><br />{{
                reservation.numberOfRooms
              }}</v-col
            >
            <v-col></v-col>
            <v-col><span class="standard-caption">Phone</span><br />{{ profile?.telephone }}</v-col>
          </v-row>
          <v-row>
            <v-col>
              TOTAL RATE<br />
              <strong>
                {{
                  priceFormatter.formatPrice(
                    protelReservationPriceCalculator.getPriceForAllNights(reservation)
                  )
                }}</strong
              ></v-col
            >
            <v-col>
              AVERAGE RATE<br />
              {{
                priceFormatter.formatPrice(
                  protelReservationPriceCalculator.getAveragePricePerNight(reservation)
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
        <v-row>
          <v-col>
            <div class="pb-3">
              <strong>{{ chargesLabel }}</strong>
            </div>
            <CartContentTable
              :cart-content-items="convertTicketsToCartContentItems(reservation.tickets)"
              :collapsed="true"
              :collapsible="true"
              :show-date="true"
              v-if="reservation.tickets.length > 0"
            ></CartContentTable>
            <div class="my-3">&nbsp;</div>
            <div class="pb-3">
              <strong>{{ conservationFeesLabel }}</strong>
            </div>
            <CartContentTable
              :cart-content-items="
                convertConservationFeesToCartContentItems(reservation.conservationFeePrices)
              "
              :collapsed="true"
              :collapsible="true"
              :show-date="true"
              v-if="!conservationFeePricesHelper.isEmpty(reservation.conservationFeePrices)"
            ></CartContentTable>
          </v-col>
          <v-col class="d-flex align-end justify-end">
            <v-btn class="position-relative me-2" @click="conservationFeeFormDialog = true">
              Conservation Fees
              <v-icon
                v-if="!conservationFeePricesHelper.isEmpty(reservation.conservationFeePrices)"
                class="position-absolute text-light-green-darken-1 text-h4"
                style="top: -12px; right: -12px"
                >mdi-check</v-icon
              >
            </v-btn>
            <v-btn @click="clickOnAddFixedCharges()" class="me-2"> Add Additional </v-btn></v-col
          >
        </v-row>
      </div>
      <div class="ps-2 ma-0 py-3 bg-lightblue">
        <v-row>
          <v-col>
            TOTAL<br />
            <strong data-cy="total">
              {{
                priceFormatter.formatPrice(
                  protelReservationPriceCalculator.getPriceForAllNightsWithTicketsWithConservationFees(
                    reservation
                  )
                )
              }}</strong
            ></v-col
          >
          <v-col> </v-col>
          <v-col></v-col>
          <v-col></v-col>
          <v-col class="d-flex"> </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>

  <v-dialog v-model="ticketsCardDialog" fullscreen scrollable>
    <v-card>
      <TicketsCard
        :arrival-date="reservation.arrivalDate"
        :departure-date="reservation.departureDate"
        :property-name="reservation.property_name"
        :property-code="reservation.property_code"
        :park-id="reservation.parkID"
        v-model="reservation"
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

  <v-dialog v-model="conservationFeeFormDialog" scrollable>
    <v-card>
      <ConservationFeeForm
        v-model="reservation"
        @close="conservationFeeFormDialog = false"
        @save="addConservationFeesToReservation()"
      ></ConservationFeeForm>
    </v-card>
  </v-dialog>
</template>
