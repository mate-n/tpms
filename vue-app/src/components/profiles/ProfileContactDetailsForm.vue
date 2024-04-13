<script setup lang="ts">
import ProfileContactDetailForm from './ProfileContactDetailForm.vue'
import { ref, type Ref } from 'vue'
import { ProfileCommunication } from '@/classes/ProfileCommunication'
import type { IProfileCommunication } from '@/interfaces/profiles/IProfileCommunication'
const emit = defineEmits(['close'])
const contactDetails: Ref<IProfileCommunication[]> = ref([])
const addContactDetail = () => {
  contactDetails.value.push(new ProfileCommunication())
}
</script>
<template>
  <v-toolbar class="bg-white elevation-3">
    <v-toolbar-title>Profile contact details </v-toolbar-title>
    <div class="border-s h-100 d-flex px-5 align-center">
      <v-btn @click="addContactDetail()"><v-icon>mdi-plus</v-icon>ADD</v-btn>
    </div>
    <div class="border-s h-100 d-flex px-5 align-center">
      <v-btn @click="emit('close')"><v-icon>mdi-close</v-icon></v-btn>
    </div>
  </v-toolbar>
  <div v-for="(contactDetail, index) in contactDetails" :key="contactDetail.typeID">
    <ProfileContactDetailForm v-model="contactDetails[index]"></ProfileContactDetailForm>
  </div>
</template>
