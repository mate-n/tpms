<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import ProfileForm from './ProfileForm.vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
import { useFullscreen } from '@/composables/Fullscreen'
import { Profile } from '@/shared/classes/Profile'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'

const cloneHelper = new CloneHelper()
const emit = defineEmits(['close', 'update'])
const close = () => emit('close')
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true }
})
const profileToBeEdited = ref<IProfile>(new Profile())
const update = (profile: IProfile) => {
  emit('update', profile)
}

onMounted(() => {
  profileToBeEdited.value = cloneHelper.clone(props.profileInput)
})

watch(props, (newInput) => {
  profileToBeEdited.value = cloneHelper.clone(newInput.profileInput)
})

const { isFullScreen, toggleFullScreen } = useFullscreen()
</script>
<template>
  <v-toolbar class="bg-white">
    <v-toolbar-title
      >Profile <v-icon>mdi-arrow-right</v-icon> #{{ profileToBeEdited.profileID }}</v-toolbar-title
    >
    <div class="profiles-card-toolbar-button" @click="toggleFullScreen()">
      <template v-if="isFullScreen">
        <v-icon size="large">mdi-fullscreen-exit</v-icon>
      </template>
      <template v-if="!isFullScreen">
        <v-icon size="large">mdi-fullscreen</v-icon>
      </template>
    </div>
    <div class="profiles-card-toolbar-button" @click="close()">
      <v-icon>mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="profiles-card-divider"></v-divider>

  <ProfileForm
    :profile-input="profileToBeEdited"
    @save="(profile) => update(profile)"
    :crud-operation="CrudOperations.Update"
  ></ProfileForm>
</template>
