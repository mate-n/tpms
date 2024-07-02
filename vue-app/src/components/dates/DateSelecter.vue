<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { computed, ref } from 'vue'
const dateFormatter = new DateFormatter()
defineProps({
  label: {
    type: String,
    required: true
  },
  error: {
    type: Object as () => string,
    required: false
  }
})

const date = defineModel({ required: true, type: Object as () => Date })

const dateMenu = ref(false)
const dateString = computed(() => {
  if (!date.value) return ''
  return dateFormatter.dddotmmdotyyyy(date.value)
})
</script>
<template>
  <v-menu v-model="dateMenu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="dateString"
        :label="label"
        append-inner-icon="mdi-calendar"
        variant="underlined"
        v-bind="props"
        :error-messages="error"
      ></v-text-field>
    </template>
    <v-card>
      <v-date-picker :hide-header="true" v-model="date"></v-date-picker>
    </v-card>
  </v-menu>
</template>
