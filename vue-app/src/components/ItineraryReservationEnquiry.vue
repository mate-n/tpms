<script setup lang="ts">
const addReservationItems = [
  { title: 'New', icon: 'mdi-playlist-check' },
  { title: 'Existing', icon: 'mdi-playlist-plus' }
]
</script>

<template>
  <v-toolbar class="bg-primary" :title="$t('general.itineraryReservationEnquiry')">
    <v-menu>
      <template v-slot:activator="{ props, isActive }">
        <v-btn class="bg-white" v-bind="props">
          {{ $t('general.addReservation') }}
          <v-icon v-if="isActive" icon="mdi-chevron-up"></v-icon>
          <v-icon v-if="!isActive" icon="mdi-chevron-down"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in addReservationItems" :key="index" :value="index">
          <v-list-item-title class="d-flex justify-space-between"
            >{{ item.title }} <v-icon :icon="item.icon"></v-icon
          ></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>
