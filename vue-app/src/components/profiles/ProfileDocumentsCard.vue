<script setup lang="ts">
import type { IProfileDocument } from '@/interfaces/profiles/IProfileDocument'
import { ProfileDocumentService } from '@/services/profiles/ProfileDocumentService'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref } from 'vue'
import { DateFormatter } from '@/helpers/DateFormatter'
import type { IGuestTravelDocument } from '@/interfaces/IGuestTravelDocument'
import { GuestTravelDocumentService } from '@/services/GuestTravelDocumentService'
const dateFormatter = new DateFormatter()
const axios: AxiosStatic | undefined = inject('axios')
const profileDocumentService = new ProfileDocumentService(axios)
const guestTravelDocumentService = new GuestTravelDocumentService(axios)
const guestTravelDocuments = ref(<IGuestTravelDocument[]>[])
const profileDocuments = ref(<IProfileDocument[]>[])

onMounted(() => {
  profileDocumentService.search({ ids: [1, 2, 3] }).then((response) => {
    profileDocuments.value = response
  })

  guestTravelDocumentService.getAvailableGuestTravelDocuments().then((response) => {
    guestTravelDocuments.value = response
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
          {{
            guestTravelDocuments.find(
              (guestTravelDocument) =>
                guestTravelDocument.id === primaryOrFirstProfileDocument.typeID
            )?.value
          }}
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
