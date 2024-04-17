<script setup lang="ts">
import { useDate } from 'vuetify'
import { ProfileDocumentFaker } from '@/faker/ProfileDocumentFaker'
import type { IProfile } from '@/interfaces/profiles/IProfile'
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import { ProfileDocumentService } from '@/services/profiles/ProfileDocumentService'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref } from 'vue'
import { DateFormatter } from '@/helpers/DateFormatter'
const dateFormatter = new DateFormatter()
const usedate = useDate()
const axios: AxiosStatic | undefined = inject('axios')
const documentFaker = new ProfileDocumentFaker()
const fake1 = documentFaker.create()
const fake2 = documentFaker.create()
const fake3 = documentFaker.create()
console.log(fake1)

console.log([fake1, fake2, fake3])

const profileDocumentService = new ProfileDocumentService(axios)
const profileDocuments = ref(<IProfileDocument[]>[])

onMounted(() => {
  profileDocumentService.search({ ids: [1, 2, 3] }).then((response) => {
    profileDocuments.value = response
  })
})

const primaryOrFirstProfileDocument = computed(() => {
  const primaryProfileDocument = profileDocuments.value.find(
    (profileDocument) => profileDocument.primary
  )
  if (primaryProfileDocument) {
    return primaryProfileDocument
  }
  return profileDocuments.value[0]
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Documents</span></v-toolbar-title>
      <v-btn icon class="text-gray"> <v-icon>mdi-folder-outline</v-icon></v-btn>
    </v-toolbar>

    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div v-if="primaryOrFirstProfileDocument">
        <div class="mb-2">
          <span class="profile-card-caption">Type </span><br />
          {{ primaryOrFirstProfileDocument.typeID }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption">Number </span><br />
          {{ primaryOrFirstProfileDocument.number }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption">Issue Date </span><br />
          {{ dateFormatter.dddotmmdotyyyy(primaryOrFirstProfileDocument.validFrom) }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption">Expiry Date </span><br />
          {{ dateFormatter.dddotmmdotyyyy(primaryOrFirstProfileDocument.validTo) }}
        </div>
        <div class="mb-2">
          <span class="profile-card-caption">Country</span><br />
          {{ primaryOrFirstProfileDocument.country }}
        </div>
      </div>
    </v-container>
  </div>
</template>
