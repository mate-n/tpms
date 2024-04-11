<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ProfileForm from './ProfileForm.vue'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import { Profile } from '@/classes/Profile'
import { CrudOperations } from '@/enums/CrudOperations'
const emit = defineEmits(['close', 'update'])
const close = () => emit('close')
const isFullScreen = ref(false)
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true }
})
const profileToBeEdited = ref<IProfile>(new Profile())
const update = (profile: IProfile) => {
  emit('update', profile)
}

onMounted(() => {
  profileToBeEdited.value = props.profileInput.clone()
})

watch(props, (newInput) => {
  profileToBeEdited.value = newInput.profileInput.clone()
})

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
</script>
<template>
  <v-toolbar>
    <v-toolbar-title
      >Profile <v-icon>mdi-arrow-right</v-icon> #{{ profileToBeEdited.id }}</v-toolbar-title
    >
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
  <div>
    <ProfileForm
      :profile-input="profileToBeEdited"
      @save="(profile) => update(profile)"
      :crud-operation="CrudOperations.Update"
    ></ProfileForm>
  </div>
</template>
