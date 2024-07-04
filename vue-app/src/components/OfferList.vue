<script setup lang="ts">
const offers = [
  {
    location: 'New York',
    price: 200,
    icon: 'mdi-tent',
    availability: true
  },
  {
    location: 'Paris',
    price: 150,
    icon: 'mdi-caravan',
    availability: true
  },
  {
    location: 'Prague',
    price: 180,
    icon: 'mdi-bed',
    availability: false
  },
  {
    location: 'Berlin',
    price: 220,
    icon: 'mdi-bed',
    availability: true
  },
  {
    location: 'Amsterdam',
    price: 280,
    icon: 'mdi-ferry',
    availability: false
  }
]
</script>

<template>
  <v-card>
    <v-table class="offer-list">
      <thead>
        <tr>
          <th class="text-center">Location</th>
          <th class="text-center">Price</th>
          <th class="text-center">Kind</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="offer in offers" :key="offer.location">
          <td>{{ offer.location }}</td>
          <td>{{ offer.price }}</td>
          <td><v-icon :icon="offer.icon"></v-icon></td>
          <td style="text-align: start">
            <v-btn
              v-if="offer.availability"
              style="background-color: green; color: white"
              elevation="4"
              >BOOK NOW</v-btn
            >
            <v-btn v-else style="background-color: red; color: white" elevation="4"
              >NOT AVAILABLE</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
