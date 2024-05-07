<script setup lang="ts">
import { ProfileAddressService } from '@/services/profiles/ProfileAddressService'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref } from 'vue'
import ProfileAddressesForm from './ProfileAddressesForm.vue'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileAddress } from '@/shared/interfaces/profiles/IProfileAddress'
import type { IProfileAddressSearch } from '@/shared/interfaces/profiles/IProfileAddressSearch'
defineProps({
  profile: { type: Object as () => IProfile, required: true }
})
const profileAddressesDialog = ref(false)
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
  const profileAddressSearch: IProfileAddressSearch = {
    ids: [1, 2, 3],
    pageNumber: 0,
    pageSize: 10
  }
  profileAddressService.search(profileAddressSearch).then((response) => {
    profileAddresses.value = response
  })
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Address</span></v-toolbar-title>
      <v-btn @click="profileAddressesDialog = true" icon>
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
  <v-dialog v-model="profileAddressesDialog">
    <v-card>
      <ProfileAddressesForm
        :profile="profile"
        @close="profileAddressesDialog = false"
      ></ProfileAddressesForm>
    </v-card>
  </v-dialog>
</template>
