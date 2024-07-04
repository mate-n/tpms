<script setup lang="ts">
import type { AxiosStatic } from 'axios'
import type { Ref } from 'vue'
import { inject, onMounted, ref } from 'vue'
import router from '@/router'
import { ProfileService } from '@/services/backend-middleware/ProfileService'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import EditProfile from '@/components/profiles/EditProfile.vue'
const axios2: AxiosStatic | undefined = inject('axios2')
const profileService = new ProfileService(axios2)

const props = defineProps({
  profileID: String
})

const profile: Ref<IProfile | undefined> = ref(undefined)

onMounted(() => {
  if (props.profileID) {
    profileLoading.value = true
    profileService.get(parseInt(props.profileID)).then((res) => {
      if (res) {
        profile.value = res
      }
      profileLoading.value = false
    })
  }
})

const goToProfiles = () => {
  router.push('/profiles')
}

const profileLoading = ref(false)
</script>

<template>
  <v-progress-linear v-if="profileLoading" color="primary" indeterminate></v-progress-linear>
  <template v-if="profile">
    <EditProfile :profile-input="profile" @close="goToProfiles()"></EditProfile>
  </template>
</template>
