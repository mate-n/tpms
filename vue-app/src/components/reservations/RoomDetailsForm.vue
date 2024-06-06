<script setup lang="ts">
import { RoomService } from '@/services/RoomService'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { IRoom } from '@/shared/interfaces/IRoom'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref, type Ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const roomService = new RoomService(axios)
const reservationToBeEdited = defineModel({ required: true, type: Object as () => IReservation })
const roomsInDropdown: Ref<IRoom[]> = ref([])

onMounted(() => {
  roomService.getAll().then((response) => {
    roomsInDropdown.value = response
  })
})

const roomValue = ref<string>('STDK')
</script>
<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Room Details</span></v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="mb-2">
        <v-col cols="10">
          <span class="standard-caption">Room</span>
          <div class="bg-lightgray">{{ roomValue }}</div></v-col
        >
        <v-col cols="2" class="d-flex align-end text-gray">
          <v-icon>mdi-lock-off-outline</v-icon></v-col
        >
      </v-row>
      <div class="d-flex"></div>
      <v-autocomplete
        label="Room Type"
        v-model="reservationToBeEdited.roomID"
        :items="roomsInDropdown"
        variant="underlined"
        item-title="name"
        item-value="id"
      ></v-autocomplete>

      <v-autocomplete
        label="Room To Change"
        v-model="reservationToBeEdited.roomID"
        :items="roomsInDropdown"
        variant="underlined"
        item-title="name"
        item-value="id"
      ></v-autocomplete>
    </v-container>
  </div>
</template>
import { RoomService } from '@/services/RoomService'; import type { IReservation } from
'@/shared/interfaces/IReservation'; import type { AxiosStatic } from 'axios'; inject, , ref, type
Ref
