<script setup lang="ts">
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import { ref } from 'vue'
const emit = defineEmits(['dateSelected'])
defineProps({
  label: {
    type: String,
    required: true
  }
})
const time = ref('10:00')
const timeMenu = ref(false)
</script>
<template>
  <v-menu v-model="timeMenu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="time"
        :label="label"
        variant="underlined"
        v-bind="props"
      ></v-text-field>
    </template>
    <v-card>
      <v-time-picker v-model="time" format="24hr" step="10"></v-time-picker>
    </v-card>
  </v-menu>
</template>
