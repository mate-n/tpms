<script setup lang="ts">
import NewProfile from '@/components/profiles/NewProfile.vue'
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { ref } from 'vue'
const newProfile = ref<IProfile>(new Profile())
</script>

<template>
  <NewProfile :profile-input="newProfile" />
</template>
@/shared/interfaces/profiles/IProfile
