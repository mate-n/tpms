<script setup lang="ts">
import { Profile } from '@/classes/Profile'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import ProfileService from '@/services/ProfileService'
import type { AxiosStatic } from 'axios'
import { inject, onMounted, ref, watch } from 'vue'
const axios: AxiosStatic | undefined = inject('axios')
const profileService = new ProfileService(axios)
import languages from '@/lists/languages'
import ProfileAvatar from './ProfileAvatar.vue'
import { CrudOperations } from '@/enums/CrudOperations'
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true },
  crudOperation: { type: Number, required: true }
})
const profileToBeEdited = ref<IProfile>(new Profile())
const emit = defineEmits(['save'])

onMounted(() => {
  profileToBeEdited.value = props.profileInput.clone()
})

watch(props, (newInput) => {
  profileToBeEdited.value = newInput.profileInput.clone()
})

const save = () => {
  if (props.crudOperation === CrudOperations.Create) {
    profileService.post(profileToBeEdited.value)
  } else if (props.crudOperation === CrudOperations.Update) {
    profileService.put(profileToBeEdited.value)
  }
  emit('save', profileToBeEdited.value)
}

const toggleActive = () => {
  if (profileToBeEdited.value.activeStatus === 'ACTIVE') {
    profileToBeEdited.value.activeStatus = 'INACTIVE'
    return
  }
  profileToBeEdited.value.activeStatus = 'ACTIVE'
  return
}
</script>
<template>
  <v-row>
    <v-col cols="2">
      <div class="my-2">
        <ProfileAvatar v-model="profileToBeEdited" :crud-operation="crudOperation"></ProfileAvatar>
      </div>
    </v-col>
    <v-col cols="10">
      <div class="d-flex">
        <div style="flex-grow: 6">
          <div class="d-flex big-vue-input-field-font-size">
            <v-text-field
              v-model="profileToBeEdited.lastName"
              label="Last Name"
              variant="underlined"
              class="me-3"
            ></v-text-field>
            <v-text-field
              v-model="profileToBeEdited.firstName"
              label="First Name"
              variant="underlined"
              class="me-3"
              aria-required="true"
            ></v-text-field>
            <v-text-field
              v-model="profileToBeEdited.middleName"
              label="Middle Name"
              variant="underlined"
              class="me-3"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <v-text-field
              v-model="profileToBeEdited.salutation"
              label="Salutation"
              variant="underlined"
              class="me-3"
            ></v-text-field>
            <v-text-field
              v-model="profileToBeEdited.personalSalutation"
              label="Personal Salutation"
              variant="underlined"
              class="me-3"
            ></v-text-field>
            <v-autocomplete
              label="Language"
              v-model="profileToBeEdited.language"
              :items="languages"
              item-title="name"
              variant="underlined"
              class="me-3"
            ></v-autocomplete>
            <v-autocomplete
              label="VIP"
              v-model="profileToBeEdited.vip"
              variant="underlined"
            ></v-autocomplete>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-toolbar>
    <div class="h-100 d-flex px-5 align-center me-auto" @click="toggleActive()">
      <template v-if="profileToBeEdited.activeStatus === 'ACTIVE'">
        <v-btn class="text-primary bg-white">
          <v-icon>mdi-check-circle-outline</v-icon> {{ $t('profile.active') }}</v-btn
        >
      </template>
      <template v-if="profileToBeEdited.activeStatus !== 'ACTIVE'">
        <v-btn class="text-primary bg-white">
          <span class="text-danger"
            ><v-icon>mdi-account-off </v-icon> {{ $t('profile.inactive') }}</span
          ></v-btn
        >
      </template>
    </div>
    <div class="h-100 d-flex px-5 align-center" @click="save()">
      <v-btn class="primary-button text-uppercase">{{ $t('actions.save') }}</v-btn>
    </div>
  </v-toolbar>
</template>
