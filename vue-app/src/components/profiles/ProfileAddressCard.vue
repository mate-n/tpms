<script setup lang="ts">
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'
import { ProfileAddressService } from '@/services/profiles/ProfileAddressService'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileAddressService = new ProfileAddressService(axios)
const profileAddresses = ref<IProfileAddress[]>([])
const primaryOrFirstAddress = computed(() => {
  const primaryAddress = profileAddresses.value.find((profileAddress) => profileAddress.primary)
  if (primaryAddress) {
    return primaryAddress
  }
  return profileAddresses.value[0]
})

onMounted(() => {
  profileAddressService.search({ ids: [1, 2, 3] }).then((response) => {
    profileAddresses.value = response
  })
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Address</span></v-toolbar-title>
      <v-btn icon>
        <v-icon class="text-gray">mdi-pencil-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div v-if="primaryOrFirstAddress">
        <div class="mb-2">
          <span class="profile-card-caption"> Country </span><br />
          {{ primaryOrFirstAddress.country }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption"> ZIP / Postal Code </span><br />
          {{ primaryOrFirstAddress.zip }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption"> Citye </span><br />
          {{ primaryOrFirstAddress.city }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption"> State /Province / Region </span><br />
          {{ primaryOrFirstAddress.state }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption"> Street Address </span><br />
          {{ primaryOrFirstAddress.street1 }}<br />
          {{ primaryOrFirstAddress.street2 }}<br />
          {{ primaryOrFirstAddress.street3 }}
        </div>
      </div>
    </v-container>
  </div>
</template>
