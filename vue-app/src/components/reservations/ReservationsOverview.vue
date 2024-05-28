<script setup lang="ts"></script>

<template>
  <v-toolbar
    class="bg-primary text-white d-flex justify-space-between"
    :title="$t('reservation.plural')"
    app
  >
    <v-btn class="bg-white me-2">
      <v-icon icon="mdi-select-all"></v-icon>

      BULK
    </v-btn>
    <v-btn class="bg-white me-2">
      <v-icon icon="mdi-filter-variant"></v-icon>

      Filter
    </v-btn>
    <v-menu>
      <template v-slot:activator="{ props, isActive }">
        <v-btn class="bg-white" v-bind="props">
          <v-icon>mdi-printer-outline</v-icon>
          PRINT
          <v-icon v-if="isActive" icon="mdi-chevron-up"></v-icon>
          <v-icon v-if="!isActive" icon="mdi-chevron-down"></v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="d-flex justify-space-between">
            New <v-icon>mdi-playlist-check</v-icon>
          </v-list-item-title>
        </v-list-item>
        <v-list-item disabled class="bg-lightgray">
          <v-list-item-title class="d-flex justify-space-between">
            Existing <v-icon>mdi-playlist-plus</v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar>
  <div class="d-flex bg-lightgray"></div>
</template>
