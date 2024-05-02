<script setup lang="ts">
import { ProfileDocument } from '@/classes/ProfileDocument'
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import { inject, ref } from 'vue'
import ProfileDocumentForm from './ProfileDocumentForm.vue'
import { IdentityHelper } from '@/helpers/IdentityHelper'
import type { AxiosStatic } from 'axios'
import { ProfileDocumentService } from '@/services/profiles/ProfileDocumentService'
const axios: AxiosStatic | undefined = inject('axios')
const profileDocumentService = new ProfileDocumentService(axios)
const identityHelper = new IdentityHelper()
const emit = defineEmits(['close'])
const profileDocuments = ref<IProfileDocument[]>([])
const addProfileDocument = () => {
  profileDocuments.value.push(new ProfileDocument())
}

const changePrimary = (profileDocument: IProfileDocument) => {
  for (const innerProfileDocument of profileDocuments.value) {
    innerProfileDocument.primary = false
  }
  const foundProfileDocument = identityHelper.findByIdOrLocalID(
    profileDocuments.value,
    profileDocument.id,
    profileDocument.localID
  )
  if (foundProfileDocument) foundProfileDocument.primary = true
}

const deleteProfileDocument = (profileDocument: IProfileDocument) => {
  if (profileDocument.id) {
    profileDocumentService.delete(profileDocument)
  }
  profileDocuments.value = profileDocuments.value.filter(
    (innerProfileDocument) => !identityHelper.isSame(innerProfileDocument, profileDocument)
  )
}
</script>
<template>
  <v-toolbar fluid class="profiles-card-toolbar">
    <v-toolbar-title>Profile Documents </v-toolbar-title>
    <div class="profiles-card-toolbar-button" @click="addProfileDocument()">
      <v-icon size="large">mdi-plus</v-icon>ADD
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emit('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-container fluid class="profiles-card-container d-flex flex-wrap">
    <div
      v-for="(profileDocument, index) in profileDocuments"
      :key="[profileDocument.id, profileDocument.localID].toString()"
    >
      <div class="bg-white mb-2 me-1 mb-1" style="min-width: 25rem">
        <ProfileDocumentForm
          v-model="profileDocuments[index]"
          :indexOfProfileDocument="index"
          @delete="(indexOfProfileDocument) => deleteProfileDocument(indexOfProfileDocument)"
          @changePrimary="(indexOfProfileDocument) => changePrimary(indexOfProfileDocument)"
        ></ProfileDocumentForm>
      </div>
    </div>
  </v-container>
</template>
