<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { PropertyService } from '@/services/PropertyService'
import { RoomService } from '@/services/RoomService'
import type { IProperty } from '@/shared/interfaces/IProperty'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import { useBasketItemsStore } from '@/stores/basketItems'
import { computed, ref, type Ref } from 'vue'
import { onBeforeMount } from 'vue'
import { inject } from 'vue'
import type { AxiosStatic } from 'axios'
import { ReservationHelper } from '@/helpers/ReservationHelper'
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import { RatesHelper } from '@/helpers/RatesHelper'
const ratesHelper = new RatesHelper()
const availabilityHelper = new AvailabilityHelper()
const axios: AxiosStatic | undefined = inject('axios')
const basketItemsStore = useBasketItemsStore()
const reservationHelper = new ReservationHelper()
const props = defineProps({
  reservation: { type: Object as () => IReservation, required: true }
})
const emits = defineEmits(['removeReservation'])
const property: Ref<IProperty | null> = ref(null)
const room: Ref<IRoom | null> = ref(null)
const propertyService = new PropertyService(axios)
const roomService = new RoomService(axios)
const dateFormatter = new DateFormatter()

onBeforeMount(() => {
  console.log('props.reservation', props.reservation)
  if (props.reservation.propertyID) {
    propertyService.get(props.reservation.propertyID).then((response) => {
      property.value = response
    })
  }

  if (props.reservation.roomID) {
    roomService.get(props.reservation.roomID).then((response) => {
      room.value = response
    })
  }
})

const removeReservation = (reservation: IReservation) => {
  basketItemsStore.removeReservation(reservation)
  emits('removeReservation')
}

const showRemoveButton = computed(() => {
  return reservationHelper.isReservationFirstOrLastOfArray(
    props.reservation,
    basketItemsStore.reservations
  )
})
</script>

<template>
  <v-card min-width="350" class="mb-2">
    <v-card-text class="pt-0 px-2">
      <div class="d-flex justify-end">
        <v-btn
          variant="text"
          size="x-small"
          v-if="showRemoveButton"
          @click="removeReservation(reservation)"
          icon
          ><v-icon size="medium">mdi-close</v-icon></v-btn
        >
      </div>
      <div class="mb-1">
        <v-icon>mdi-chevron-double-right</v-icon><strong>{{ reservation.propertyName }}</strong>
      </div>
      <v-row class="pb-0">
        <v-col class="text-gray">{{ room?.code }}</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-right </v-icon
          >{{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }}</v-col
        >
      </v-row>
      <v-row class="mt-0 pb-0">
        <v-col class="text-gray">Base Rate | Low Season</v-col>
        <v-col class="d-flex justify-end"
          ><v-icon>mdi-arrow-left </v-icon
          >{{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}</v-col
        >
      </v-row>
      <v-divider class="mt-1"></v-divider>
      <v-row class="mt-0 pb-0">
        <v-col></v-col>
        <v-col class="">
          <div class="mb-1 text-end">
            <div
              v-for="availabilityGroup of availabilityHelper.groupAvailabilitiesByRoomType(
                reservation.selectedProtelAvailabilities
              )"
              :key="availabilityGroup[0].room_type_name"
            >
              {{ availabilityGroup.length }} x
              {{
                ratesHelper.calculateActualRate(
                  availabilityGroup[0].rates_data[0],
                  reservation.guestsPerRoom
                )
              }}
            </div>
          </div>
          <v-divider></v-divider>
          <div class="text-end mt-1">
            Total:
            <strong>{{ reservationHelper.calculateTotalRate(reservation) }}</strong>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
