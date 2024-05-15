<script setup lang="ts">
import { Stationery } from '@/shared/classes/Stationery'
import type { IStationery } from '@/shared/interfaces/IStationery'
import { ref, type Ref } from 'vue'
import StationeryFormCard from './StationeryFormCard.vue'
const emits = defineEmits(['close'])

const availableTableDataHeaders = ref([
  { key: 'createdAt', title: 'CREATED DATE', selected: true },
  { key: 'time', title: 'TIME', selected: true },
  { key: 'createdByName', title: 'CREATED BY', selected: true },
  { key: 'invno', title: 'INV. NO.', selected: true },
  { key: 'resno', title: 'RES. NO.', selected: true },
  { key: 'event', title: 'EVENT', selected: true },
  { key: 'resgroup', title: 'RES. GROUP', selected: true },
  { key: 'language', title: 'LANGUAGE', selected: true }
])
const stationeries: Ref<IStationery[]> = ref([])
const changeColumnsDialog = ref(false)
const addStationery = () => {
  const newStationery = new Stationery()
  stationeries.value.push(newStationery)
}

const stationeryFormCardDialog = ref(false)
</script>

<template>
  <div class="standard-dialog-card">
    <v-toolbar class="standard-dialog-card-toolbar">
      <v-toolbar-title><span class="text-primary">Text History</span></v-toolbar-title>
      <div class="standard-card-toolbar-button" @click="stationeryFormCardDialog = true">Add</div>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>
    <v-container fluid class="bg-lightgray px-0 mx-0">
      <v-data-table
        :headers="availableTableDataHeaders.filter((h) => h.selected)"
        :items="stationeries"
      >
        <template v-slot:[`header.avatar`]="{ column }">
          {{ column.title }}
          <v-icon>mdi-sort-variant </v-icon>
        </template>
        <template v-slot:[`header.menu`]="{ column }">
          {{ column.title }}
          <v-btn icon variant="text">
            <v-icon @click="changeColumnsDialog = true">mdi-cog-outline</v-icon>
          </v-btn>
        </template>
        <template v-slot:item="row">
          <tr>
            <td
              v-for="header in availableTableDataHeaders.filter((h) => h.selected)"
              :key="header.key"
            >
              <div v-if="row.item.hasOwnProperty(header.key)">
                <template v-if="header.key !== 'birthday'">
                  {{ row.item[header.key as keyof IStationery] }}
                </template>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
  <v-dialog v-model="stationeryFormCardDialog" scrollable auto>
    <v-card>
      <StationeryFormCard @close="stationeryFormCardDialog = false"></StationeryFormCard>
    </v-card>
  </v-dialog>
</template>
