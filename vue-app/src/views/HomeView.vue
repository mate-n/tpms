<script setup lang="ts">
import OfferList from '../components/OfferList.vue'
</script>

<template>
  <v-container>
    <v-card
      title="Welcome to our Website!"
      style="margin-bottom: 2rem"
      prepend-icon="mdi-home-heart"
    >
      <v-card-text>
        <p>Take a look at our offers and book your next vacation!</p>
      </v-card-text></v-card
    >

    <OfferList />
  </v-container>
</template>
