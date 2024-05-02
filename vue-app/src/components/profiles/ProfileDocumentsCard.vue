<script setup lang="ts">
import { ProfileDocumentService } from '@/services/profiles/ProfileDocumentService'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref, type Ref } from 'vue'
import { DateFormatter } from '@/helpers/DateFormatter'
import { GuestTravelDocumentService } from '@/services/GuestTravelDocumentService'
import ProfileDocumentsForm from '@/components/profiles/ProfileDocumentsForm.vue'
import type { IGuestTravelDocument } from '@/shared/interfaces/IGuestTravelDocument'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IProfileDocument } from '@/shared/interfaces/profiles/IProfileDocument'
import type { IProfileDocumentSearch } from '@/shared/interfaces/profiles/IProfileDocumentSearch'
const dateFormatter = new DateFormatter()
const axios: AxiosStatic | undefined = inject('axios')
const profileDocumentService = new ProfileDocumentService(axios)
const guestTravelDocumentService = new GuestTravelDocumentService(axios)
const guestTravelDocuments: Ref<IGuestTravelDocument[]> = ref([])
const profileDocuments: Ref<IProfileDocument[]> = ref([])
defineProps({
  profile: { type: Object as () => IProfile, required: true }
})

const profileDocumentsDialog = ref(false)

onMounted(() => {
  const profileDocumentSearch: IProfileDocumentSearch = {
    ids: [1, 2, 3],
    pageNumber: 0,
    pageSize: 10
  }
  profileDocumentService.search(profileDocumentSearch).then((response) => {
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
      <v-btn @click="profileDocumentsDialog = true" icon>
        <v-btn icon class="text-gray"> <v-icon>mdi-folder-outline</v-icon></v-btn>
      </v-btn>
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
    <v-dialog v-model="profileDocumentsDialog" auto scrollable>
      <v-card>
        <ProfileDocumentsForm
          :profile="profile"
          @close="profileDocumentsDialog = false"
        ></ProfileDocumentsForm>
      </v-card>
    </v-dialog>
  </div>
</template>
