<script setup lang="ts">
const emits = defineEmits(['close'])
</script>
<template>
  <div class="standard-card bg-lightgray">
    <v-toolbar class="standard-card-toolbar">
      <v-toolbar-title><span class="text-primary">Room Details</span></v-toolbar-title>
      <div class="standard-card-toolbar-button rounded-te" @click="emits('close')">
        <v-icon size="large">mdi-close</v-icon>
      </div>
    </v-toolbar>
    <v-divider class="standard-card-divider"></v-divider>

    <v-container fluid class="profiles-card-container">
      <v-card>
        <v-carousel hide-delimiters>
          <v-carousel-item src="https://picsum.photos/800/600?sig=1" cover></v-carousel-item>

          <v-carousel-item src="https://picsum.photos/800/600?sig=2" cover></v-carousel-item>

          <v-carousel-item src="https://picsum.photos/800/600?sig=3" cover></v-carousel-item>
        </v-carousel>
        <v-card-text>
          <h1>Kruger National Park</h1>
          <h2 class="mt-3">Family Chalet FCH6</h2>
          <v-divider class="my-2"></v-divider>
          <div>
            <h3 class="font-weight-bold mb-2">What this place offers</h3>
            <div class="ms-4">
              <ul>
                <li>2 bedrooms, each with 2 single beds</li>
                <li>2 single beds in lounge</li>
                <li>Air-conditioned</li>
                <li>Fully Equipped</li>
                <li>Internal roads not suitable for sedan vehicles</li>
                <li>
                  Kitchen includes 2 plate stove and fridge/freezer No additional persons allowed No
                </li>
                <li>smoking WC and shower</li>
              </ul>
            </div>
          </div>
          <div class="mt-3">
            <h3 class="font-weight-bold mb-2">Room Rate</h3>
            2,322.95
          </div>
          <div class="mt-3">
            <h3 class="font-weight-bold mb-2">Free Rooms</h3>
            4
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
