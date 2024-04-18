<script setup lang="ts">
import { ProfileAddress } from '@/classes/ProfileAddress'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'
import { ref, watch, type Ref } from 'vue'
import ProfileAddressForm from './ProfileAddressForm.vue'

const emit = defineEmits(['close'])
const profileAddresses: Ref<IProfileAddress[]> = ref([])
const props = defineProps({
  profile: { type: Object as () => IProfile, required: true }
})
watch(
  profileAddresses,
  () => {
    showSaveButton.value = true
  },
  { deep: true }
)
const showSaveButton = ref(false)
const addProfileAddress = () => {
  profileAddresses.value.push(new ProfileAddress())
}
</script>
<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title> Profile Addresses </v-toolbar-title>
    <div v-if="showSaveButton" class="profiles-card-toolbar-button text-primary">
      <v-icon size="large">mdi-content-save-outline</v-icon>
    </div>
    <div class="profiles-card-toolbar-button" @click="addProfileAddress()">
      <v-icon size="large">mdi-plus</v-icon>ADD
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-container fluid class="profiles-card-container d-flex flex-wrap">
    <div v-for="(profileAddress, index) in profileAddresses" :key="profileAddress.id">
      <div class="bg-white mb-2 me-1 mb-1">
        <ProfileAddressForm v-model="profileAddresses[index]"></ProfileAddressForm>
      </div>
    </div>
  </v-container>
</template>
