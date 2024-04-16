<script setup lang="ts"></script>

<template>
  <v-toolbar class="bg-white elevation-1">
    <v-toolbar-title><span class="text-primary">Preferences / Notes</span></v-toolbar-title>
    <v-btn icon>
      <v-icon class="text-gray">mdi-pencil-outline</v-icon>
    </v-btn>
  </v-toolbar>
  <v-divider></v-divider>
  <v-card>
    <template v-slot:text>
      <div class="mb-2">
        Mobile<br />
        123456789
      </div>
      <div>
        E-Mail<br />
        max.mustermann@mail.com
      </div>
    </template>
  </v-card>
</template>
