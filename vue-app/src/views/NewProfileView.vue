<script setup lang="ts">
import { Profile } from '@/classes/Profile'
import NewProfile from '@/components/profiles/NewProfile.vue'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { ref } from 'vue'
const newProfile = ref<IProfile>(new Profile())
</script>

<template>
  <NewProfile :profile-input="newProfile" />
</template>
