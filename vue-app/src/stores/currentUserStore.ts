import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUserStore', () => {
  const systemUser: Ref<string | undefined> = ref('')
  const pmsId: Ref<string | undefined> = ref('')
  return { systemUser, pmsId }
})
