<script setup lang="ts">
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { ProfileValidator } from '@/shared/validators/ProfileValidator'
import ProfileAvatar from './ProfileAvatar.vue'
import PrivateProfileForm from './PrivateProfileForm.vue'
import CompanyProfileForm from './CompanyProfileForm.vue'
import TravelAgencyProfileForm from './TravelAgencyProfileForm.vue'

const emit = defineEmits(['blur-name'])
const profileValidator = new ProfileValidator()
const profileToBeEdited = defineModel({ required: true, type: Object as () => IProfile })

const validate = () => {
  profileValidator.validate(profileToBeEdited.value)
}

defineProps({
  crudOperation: { type: Number, required: false, default: 2 }
})

const blurName = () => {
  emit('blur-name')
}
</script>
<template>
  <v-container fluid class="bg-white">
    <v-row>
      <v-col cols="2">
        <div class="my-2">
          <ProfileAvatar
            v-model="profileToBeEdited"
            :crud-operation="crudOperation"
          ></ProfileAvatar>
        </div>
      </v-col>
      <v-col cols="10" class="border-s">
        <div v-if="profileToBeEdited.profileType === 'Private'">
          <PrivateProfileForm
            v-model="profileToBeEdited"
            @change="validate()"
            @blur-name="blurName()"
          ></PrivateProfileForm>
        </div>
        <div
          v-if="
            profileToBeEdited.profileType === 'Company' ||
            profileToBeEdited.profileType === 'Group' ||
            profileToBeEdited.profileType === 'Source'
          "
        >
          <CompanyProfileForm v-model="profileToBeEdited" @change="validate()"></CompanyProfileForm>
        </div>
        <div v-if="profileToBeEdited.profileType === 'TravelAgency'">
          <TravelAgencyProfileForm
            v-model="profileToBeEdited"
            @change="validate()"
          ></TravelAgencyProfileForm>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
