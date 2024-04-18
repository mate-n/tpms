<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ProfileForm from './ProfileForm.vue'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { Profile } from '@/classes/Profile'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
const cloneHelper = new CloneHelper()
const newProfile = ref<IProfile>(new Profile())
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true }
})
const emit = defineEmits(['close', 'save'])
const close = () => emit('close')
const save = (profile: IProfile) => {
  emit('save', profile)
}
const isFullScreen = ref(false)

const toggleFullScreen = () => {
  isFullScreen.value = !isFullScreen.value
  const elem = document.documentElement
  if (isFullScreen.value) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

onMounted(() => {
  newProfile.value = cloneHelper.clone(props.profileInput)
})

watch(props, (newInput) => {
  newProfile.value = cloneHelper.clone(newInput.profileInput)
})
</script>
<template>
  <v-toolbar class="bg-white">
    <v-toolbar-title>New Profile</v-toolbar-title>
    <div class="border-s h-100 d-flex px-5 align-center" @click="toggleFullScreen()">
      <template v-if="isFullScreen">
        <v-btn><v-icon>mdi-fullscreen-exit</v-icon></v-btn>
      </template>
      <template v-if="!isFullScreen">
        <v-btn><v-icon>mdi-fullscreen</v-icon></v-btn>
      </template>
    </div>
    <div class="border-s h-100 d-flex px-5 align-center" @click="close()">
      <v-btn><v-icon>mdi-close</v-icon></v-btn>
    </div>
  </v-toolbar>
  <v-divider class="profiles-card-divider"></v-divider>

  <ProfileForm
    :profile-input="newProfile"
    :crud-operation="CrudOperations.Create"
    @save="(profile) => save(profile)"
  ></ProfileForm>
</template>
