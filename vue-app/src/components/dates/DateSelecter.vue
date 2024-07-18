<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { computed, ref } from 'vue'
const dateFormatter = new DateFormatter()
defineProps({
  label: {
    type: String,
    required: true
  },
  min: {
    type: Date,
    required: false,
  },
  max: {
    type: Date,
    required: false,
  },
  errorMessage: {
    type: String,
    required: false
  },
  readonly: {
    type: Boolean,
    required: false
  },
  dataCy: {
    type: String,
    required: false
  }
})

const date = defineModel({ required: false, type: Object as () => Date })

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
        :error-messages="errorMessage"
        :readonly="readonly"
        :data-cy="dataCy"
        v-bind="props"
      ></v-text-field>
    </template>
    <v-card v-if="!readonly">
      <v-date-picker
        :hide-header="true"
        :min="min"
        :max="max"
        v-model="date"
        :data-cy="`${dataCy}_picker`"
      ></v-date-picker>
    </v-card>
  </v-menu>
</template>
