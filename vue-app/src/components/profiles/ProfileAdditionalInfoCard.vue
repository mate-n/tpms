<script setup lang="ts"></script>

<template>
  <v-toolbar class="bg-white elevation-1">
    <v-toolbar-title><span class="text-primary">Additional Info</span></v-toolbar-title>
  </v-toolbar>
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
