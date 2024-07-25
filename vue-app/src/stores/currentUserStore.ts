import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUserStore', () => {
  const pmsId: Ref<string | undefined> = ref('')
  return { pmsId }
})
