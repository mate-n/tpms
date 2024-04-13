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
import ProfileContactDetailsCard from './ProfileContactDetailsCard.vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
import { ProfileAddressFaker } from '@/faker/ProfileAddressFaker'
const cloneHelper = new CloneHelper()
const props = defineProps({
  profileInput: { type: Object as () => IProfile, required: true },
  crudOperation: { type: Number, required: true }
})
const profileToBeEdited = ref<IProfile>(new Profile())
const emit = defineEmits(['save'])

onMounted(() => {
  profileToBeEdited.value = cloneHelper.clone(props.profileInput)
  const profileAddressFaker = new ProfileAddressFaker()
  console.log(profileAddressFaker.createFakeProfileAddress())
  const fake1 = profileAddressFaker.createFakeProfileAddress()
  const fake2 = profileAddressFaker.createFakeProfileAddress()
  const fake3 = profileAddressFaker.createFakeProfileAddress()
  console.log([fake1, fake2, fake3])
})

watch(props, (newInput) => {
  profileToBeEdited.value = cloneHelper.clone(newInput.profileInput)
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
  profileToBeEdited.value.inactive = !profileToBeEdited.value.inactive
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
              v-model="profileToBeEdited.salut"
              label="Salutation"
              variant="underlined"
              class="me-3"
            ></v-text-field>
            <v-text-field
              v-model="profileToBeEdited.salutShort"
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
              v-model="profileToBeEdited.vipCodeIDs"
              variant="underlined"
            ></v-autocomplete>
          </div>
        </div>
      </div>
    </v-col>
  </v-row>
  <v-toolbar>
    <div class="h-100 d-flex px-5 align-center me-auto" @click="toggleActive()">
      <template v-if="!profileToBeEdited.inactive">
        <v-btn class="text-primary bg-white">
          <v-icon>mdi-check-circle-outline</v-icon> {{ $t('profile.active') }}</v-btn
        >
      </template>
      <template v-if="profileToBeEdited.inactive">
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
  <v-row>
    <v-col>
      <ProfileContactDetailsCard v-model="profileToBeEdited"></ProfileContactDetailsCard>
    </v-col>
    <v-col>
      <ProfileContactDetailsCard v-model="profileToBeEdited"></ProfileContactDetailsCard>
    </v-col>
  </v-row>
</template>
