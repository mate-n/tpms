<script setup lang="ts">
import { onMounted, ref, watch, type Ref } from 'vue'
import ProfileAddressForm from './ProfileAddressForm.vue'
import { ProfileAddressService } from '@/services/profiles/ProfileAddressService'
import { IdentityHelper } from '@/helpers/IdentityHelper'
import { ProfileAddress } from '@/shared/classes/ProfileAddress'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileAddress } from '@/shared/interfaces/profiles/IProfileAddress'
const identityHelper = new IdentityHelper()
const profileAddressService = new ProfileAddressService()
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

const getProfileAddresses = () => {
  return new Promise<void>((resolve) => {
    if (props.profile.id) {
      profileAddressService.getAllByProfileID(props.profile.id).then((response) => {
        profileAddresses.value = response
        resolve()
      })
    } else {
      resolve()
    }
  })
}

const deleteProfileAddress = (profileAddress: IProfileAddress) => {
  profileAddressService.delete(profileAddress)
  profileAddresses.value = profileAddresses.value.filter(
    (innerProfileAddress) => !identityHelper.isSame(innerProfileAddress, profileAddress)
  )
}

const changeMailingAddress = (profileAddress: IProfileAddress) => {
  for (const innerProfileDocument of profileAddresses.value) {
    innerProfileDocument.primary = false
  }
  const foundProfileAddress = identityHelper.findByIdOrLocalID(
    profileAddresses.value,
    profileAddress.id,
    profileAddress.localID
  )
  if (foundProfileAddress) foundProfileAddress.primary = true
}

onMounted(() => {
  getProfileAddresses()
})

const saveAllProfileAddresses = () => {
  const promisesToSaveProfileAddresses: Promise<void>[] = []

  profileAddresses.value.forEach((profileAddress) => {
    const promiseToSaveProfileAddress = new Promise<void>((innerResolve) => {
      profileAddressService.createOrUpdate(profileAddress).then(() => {
        innerResolve()
      })
    })
    promisesToSaveProfileAddresses.push(promiseToSaveProfileAddress)
  })

  Promise.all(promisesToSaveProfileAddresses).then(() => {
    showSaveButton.value = false
  })
}
</script>
<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title> Profile Addresses </v-toolbar-title>
    <div
      v-if="showSaveButton"
      class="profiles-card-toolbar-button text-primary"
      @click="saveAllProfileAddresses()"
    >
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
      <div class="bg-white mb-2 me-1 mb-1" style="min-width: 25rem">
        <ProfileAddressForm
          v-model="profileAddresses[index]"
          :indexOfProfileAddress="index"
          @delete="(profileAddress) => deleteProfileAddress(profileAddress)"
          @changeMailingAddress="(profileAddress) => changeMailingAddress(profileAddress)"
        ></ProfileAddressForm>
      </div>
    </div>
  </v-container>
</template>
