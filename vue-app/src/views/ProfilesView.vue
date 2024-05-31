<script setup="ts">
import ProfileSearch from '@/components/profiles/ProfileSearch.vue'
</script>

<template>
  <v-toolbar color="primary" title="Profiles"></v-toolbar>
  <ProfileSearch
    @close="closeProfileDialog()"
    @profile-selected="(profile) => profileSelected(profile)"
  ></ProfileSearch>
</template>
