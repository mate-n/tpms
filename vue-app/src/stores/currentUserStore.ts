import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/shared/interfaces/IUser'

export const useCurrentUserStore = defineStore('currentUserStore', () => {
  const user: Ref<IUser | undefined> = ref()
  const systemUser: Ref<string | undefined> = ref('')
  const pmsId: Ref<string | undefined> = ref('')
  return { user, systemUser, pmsId }
})
