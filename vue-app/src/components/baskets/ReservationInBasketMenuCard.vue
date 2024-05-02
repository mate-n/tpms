<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { PropertyService } from '@/services/PropertyService'
import { RoomService } from '@/services/RoomService'
import type { IProperty } from '@/shared/interfaces/IProperty'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import { useBasketItemsStore } from '@/stores/basketItems'
import type { AxiosStatic } from 'axios'
import { ref, type Ref } from 'vue'
import { inject, onBeforeMount } from 'vue'
const basketItemsStore = useBasketItemsStore()

const props = defineProps({
  reservation: { type: Object as () => IReservation, required: true }
})
const property: Ref<IProperty | null> = ref(null)
const room: Ref<IRoom | null> = ref(null)
const axios: AxiosStatic | undefined = inject('axios')
const propertyService = new PropertyService(axios)
const roomService = new RoomService(axios)
const dateFormatter = new DateFormatter()

onBeforeMount(() => {
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
}
</script>

<template>
  <v-card min-width="350" class="mb-2">
    <v-card-text class="pt-0 px-2">
      <div class="d-flex justify-end">
        <v-btn variant="text" size="x-small" @click="removeReservation(reservation)" icon
          ><v-icon size="medium">mdi-close</v-icon></v-btn
        >
      </div>
      <div class="mb-1">
        <v-icon>mdi-chevron-double-right</v-icon><strong>{{ property?.name }}</strong>
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
        <v-col class="d-flex justify-end"><strong>1.934,00</strong></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
