import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorsStore = defineStore('errors', () => {
  const errorMessage = ref('')
  const triggerDialogCounter = ref(0)
  function triggerDialog(errorMessageInput: string) {
    errorMessage.value = errorMessageInput
    triggerDialogCounter.value++
  }

  return { triggerDialogCounter, errorMessage, triggerDialog }
})
