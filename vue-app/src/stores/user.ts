import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'

export const useUserStore = defineStore('user', () => {
  const currentProfile: Ref<IProfile | undefined> = ref(undefined)
  return { currentProfile }
})
