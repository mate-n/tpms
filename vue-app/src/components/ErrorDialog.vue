<script setup lang="ts">
import { useErrorsStore } from '@/stores/errors'
import { ref, watch } from 'vue'
const errorsStore = useErrorsStore()
const dialog = ref(false)

watch(
  () => errorsStore.triggerDialogCounter,
  () => {
    if (errorsStore.errorMessage) {
      dialog.value = true
    }
  }
)
</script>
<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card prepend-icon="mdi-alert-circle-outline" title="Error">
      <v-card-text>
        <p>Something went wrong.</p>
        <div style="white-space: pre-line">
          {{ errorsStore.errorMessage }}
        </div>
      </v-card-text>
      <template v-slot:actions>
        <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
