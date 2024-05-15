<script setup lang="ts">
import { GuestMarketCodeService } from '@/services/GuestMarketCodeService'
import { KeywordService } from '@/services/KeywordService'
import type { IGuestMarketCode } from '@/shared/interfaces/IGuestMarketCode'
import type { IKeyword } from '@/shared/interfaces/IKeyword'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import { onMounted, ref } from 'vue'
const guestMarketCodeService = new GuestMarketCodeService()
const keywordService = new KeywordService()
const profileToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfile
})

const guestMarketCodes = ref<IGuestMarketCode[]>([])
const keywords = ref<IKeyword[]>([])

const getValueForGuestMarketCodeID = (guestMarketCodeID: number) => {
  const guestMarketCode = guestMarketCodes.value.find(
    (guestMarketCode) => guestMarketCode.id === guestMarketCodeID
  )
  return guestMarketCode ? guestMarketCode.value : ' '
}

const getValueForKeywordID = (keyWordID: number) => {
  const keyword = keywords.value.find((keyword) => keyword.id === keyWordID)
  return keyword ? keyword.value : ' '
}

onMounted(() => {
  guestMarketCodeService.getAvailableMarketCodes().then((response) => {
    guestMarketCodes.value = response
  })

  keywordService.getAvailableKeywords().then((response) => {
    keywords.value = response
  })
})
</script>

<template>
  <div class="profiles-card">
    <v-toolbar class="profiles-card-toolbar">
      <v-toolbar-title><span class="text-primary">Marketing</span></v-toolbar-title>
      <v-btn icon>
        <v-icon class="text-gray">mdi-camera-enhance-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider class="profiles-card-divider"></v-divider>
    <v-container>
      <div class="mb-2">
        <span class="profile-card-caption">Codes</span><br />
        <div class="d-flex">
          <div
            v-for="guestMarketCodeID of profileToBeEdited.marketingCodeIDs"
            :key="guestMarketCodeID"
          >
            <div class="profiles-pill">
              {{ getValueForGuestMarketCodeID(guestMarketCodeID) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Tags</span><br />
        <div class="d-flex">
          <div v-for="keywordId of profileToBeEdited.marketingTagIDs" :key="keywordId">
            <div class="profiles-pill">
              {{ getValueForKeywordID(keywordId) }}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Marketing</span><br />
        <div class="d-flex">
          <div class="profiles-pill">
            {{ profileToBeEdited.allowMarketing ? 'Allowed' : 'Not Allowed' }}
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Data Processing</span><br />
        <div class="d-flex">
          <div class="profiles-pill">
            {{ profileToBeEdited.marketingDataProcessing ? 'Allowed' : 'Not Allowed' }}
          </div>
        </div>
      </div>

      <div class="mb-2">
        <span class="profile-card-caption">Approval to print Membership Card</span><br />
        <div class="d-flex">
          <div class="profiles-pill">
            {{
              profileToBeEdited.marketingApprovalToPrintMembershipCard ? 'Allowed' : 'Not Allowed'
            }}
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
