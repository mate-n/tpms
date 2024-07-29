<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IRoom } from '@/shared/interfaces/IRoom'
import { computed, ref, type Ref } from 'vue'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { ProtelReservationPriceCalculator } from '@/helpers/ProtelReservationPriceCalculator'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { RoomHelper } from '@/helpers/RoomHelper'
const priceFormatter = new PriceFormatter()
const roomHelper = new RoomHelper()
const dateHelper = new DateHelper()
const protelReservationPriceCalculator = new ProtelReservationPriceCalculator()
const props = defineProps({
  reservation: { type: Object as () => IProtelReservation, required: true }
})
const emits = defineEmits(['removeReservation'])
const room: Ref<IRoom | null> = ref(null)
const dateFormatter = new DateFormatter()

const removeReservation = (reservation: IProtelReservation) => {
  //basketItemsStore.removeReservation(reservation)
  emits('removeReservation')
}

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    props.reservation.arrivalDate,
    props.reservation.departureDate
  )
})
</script>

<template>
  <v-card min-width="350" class="mb-2" data-cy="reservation_basket_menu_card">
    <v-card-text class="pt-0 px-2">
      <div class="d-flex justify-end">
        <v-btn variant="text" size="x-small" @click="removeReservation(reservation)" icon
          ><v-icon size="medium">mdi-close</v-icon></v-btn
        >
      </div>
      <div class="mb-1">
        <div class="ms-2 pb-3">
          <v-icon>mdi-chevron-double-right</v-icon>
          <strong data-cy="property_name">{{ reservation.property_name }}</strong
          ><br />
          <span class="text-black" data-cy="room_type_code">{{
            roomHelper.removeCloneRoomTypeCodeSuffix(reservation.roomTypeCode)
          }}</span>
        </div>
      </div>
      <v-row class="pb-0">
        <v-col class="text-gray">{{ room?.code }}</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-right </v-icon
          ><span data-cy="arrival_date">
            {{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }}
          </span>
        </v-col>
      </v-row>
      <v-row class="mt-0 pb-0">
        <v-col class="text-gray">Base Rate | Low Season</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-left </v-icon>
          <span data-cy="departure_date">
            {{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}
          </span>
        </v-col>
      </v-row>
      <v-divider class="mt-1"></v-divider>
      <v-row class="mt-0 pb-0">
        <v-col></v-col>
        <v-col class="">
          <div class="mb-1 text-end">
            {{ numberOfNights }} x {{ reservation.numberOfRooms }} x
            {{ priceFormatter.formatPrice(parseInt(reservation.rate.value)) }}
          </div>
          <v-divider></v-divider>
          <div class="text-end mt-1">
            Total:
            <strong data-cy="total">{{
              priceFormatter.formatPrice(
                protelReservationPriceCalculator.getPriceForAllNightsWithTickets(reservation)
              )
            }}</strong>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
