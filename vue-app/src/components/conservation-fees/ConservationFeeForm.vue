<script setup lang="ts">
import type { IAdultsAndChildren } from '@/shared/interfaces/IAdultsAndChildren'
import type { IFreeEntryReasonWithAdultsAndChildren } from '@/shared/interfaces/IFreeEntryReasonWithAdultsAndChildren'
import type { IWildcardWithAdultsAndChildren } from '@/shared/interfaces/IWildcardWithAdultsAndChildren'
import { computed, ref, type Ref } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const southAfricanCitizens: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0 })
const sadcCitizens: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0 })
const internationals: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0 })

const totalNumberOfConservationFeesForAdults = ref(14)
const totalNumberOfConservationFeesForChildren = ref(14)

const appliedNumberOfConservationFeesForAdults = computed(() => {
  return southAfricanCitizens.value.adults + sadcCitizens.value.adults + internationals.value.adults
})

const appliedNumberOfConservationFeesForChildren = computed(() => {
  return (
    southAfricanCitizens.value.children +
    sadcCitizens.value.children +
    internationals.value.children
  )
})

const outstandingNumberOfConservationFeesForAdults = computed(() => {
  return (
    totalNumberOfConservationFeesForAdults.value -
    appliedNumberOfConservationFeesForAdults.value -
    adultsFromFreeEntryReasons.value -
    adultsFromWildcards.value
  )
})

const outstandingNumberOfConservationFeesForChildren = computed(() => {
  return (
    totalNumberOfConservationFeesForChildren.value -
    appliedNumberOfConservationFeesForChildren.value -
    childrenFromFreeEntryReasons.value -
    childrenFromWildcards.value
  )
})

const freeEntryReasons = ref<IFreeEntryReasonWithAdultsAndChildren[]>([])
const freeEntryReasonInSelect = ref<string>('')
const addFreeEntryReason = () => {
  const newFreeEntryReason: IFreeEntryReasonWithAdultsAndChildren = {
    freeEntryReason: freeEntryReasonInSelect.value,
    adultsAndChildren: { adults: 0, children: 0 }
  }
  freeEntryReasons.value.push(newFreeEntryReason)
  freeEntryReasonInSelect.value = ''
}

const wildcards = ref<IWildcardWithAdultsAndChildren[]>([])
const wildcardTextField = ref<string>('')
const addWildcard = () => {
  const newWildcard: IWildcardWithAdultsAndChildren = {
    wildcard: wildcardTextField.value,
    adultsAndChildren: { adults: 0, children: 0 }
  }
  wildcards.value.push(newWildcard)
  wildcardTextField.value = ''
}

const getBackGroundClassForCell = (index: number) => {
  return index % 2 === 0
    ? 'conservation-fee-cell-background1 conservation-fee-cell'
    : 'conservation-fee-cell-background2 conservation-fee-cell'
}

const adultsFromWildcards = computed(() => getAdultsFromWildcards())
const childrenFromWildcards = computed(() => getChildrenFromWildcards())

const adultsFromFreeEntryReasons = computed(() => getAdultsFromFreeEntryReasons())
const childrenFromFreeEntryReasons = computed(() => getChildrenFromFreeEntryReasons())

const getAdultsFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.adults, 0)
}

const getChildrenFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.children, 0)
}

const getAdultsFromFreeEntryReasons = () => {
  return freeEntryReasons.value.reduce(
    (acc, freeEntryReason) => acc + freeEntryReason.adultsAndChildren.adults,
    0
  )
}

const getChildrenFromFreeEntryReasons = () => {
  return freeEntryReasons.value.reduce(
    (acc, freeEntryReason) => acc + freeEntryReason.adultsAndChildren.children,
    0
  )
}
</script>
<style scoped>
.conservation-fee-cell-background1 {
  background-color: #cce2cc;
}

.conservation-fee-cell-background2 {
  background-color: #e7f1e6;
}

.conservation-fee-cell {
  border: 0.15rem solid white;
}
</style>

<template>
  <v-container>
    <v-row class="bg-primary font-size-rem-12 conservation-fee-cell">
      <v-col> 19 - 26 July 2024 </v-col>
      <v-col> Adults </v-col>
      <v-col> Children </v-col>
    </v-row>
    <v-row>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        South African Citizens and Residents
      </v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="southAfricanCitizens.adults"
          hide-details
          label="Adults"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="southAfricanCitizens.children"
          hide-details
          label="Children"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell"> SADC Citizens </v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        <v-number-input
          v-model="sadcCitizens.adults"
          hide-details
          label="Adults"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        <v-number-input
          v-model="sadcCitizens.children"
          hide-details
          label="Children"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        International (non-South African Citizens)
      </v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="internationals.adults"
          hide-details
          label="Adults"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="internationals.children"
          hide-details
          type="number"
          label="Children"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="bg-primary font-size-rem-12 conservation-fee-cell">
      <v-col cols="4"> Wildcards </v-col>
      <v-col cols="8" class="d-flex align-center">
        <v-text-field
          label="Enter Wildcard"
          class="me-2"
          hide-details
          density="compact"
          v-model="wildcardTextField"
        >
        </v-text-field>

        <v-btn class="align-self-center text-black" @click="addWildcard()">+ ADD</v-btn></v-col
      >
    </v-row>

    <v-row class="" v-for="(wildcard, index) of wildcards" :key="wildcard">
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        {{ wildcard.wildcard }}</v-col
      >
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="wildcard.adultsAndChildren.adults"
          hide-details
          type="number"
          label="Adults"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="wildcard.adultsAndChildren.children"
          hide-details
          type="number"
          label="Children"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="bg-primary font-size-rem-12 conservation-fee-cell">
      <v-col cols="4"> Free Entry Reasons </v-col>
      <v-col class="d-flex align-center" cols="8">
        <v-select
          v-model="freeEntryReasonInSelect"
          class="me-2"
          label="Select reason"
          :items="['Guest of Staff', 'Media', 'VIP', 'Other']"
          hide-details
          density="compact"
        ></v-select>
        <v-btn class="align-self-center text-black" @click="addFreeEntryReason()"
          >+ ADD</v-btn
        ></v-col
      >
    </v-row>
    <v-row v-for="(freeEntryReason, index) of freeEntryReasons" :key="freeEntryReason">
      <v-col
        :class="getBackGroundClassForCell(index)"
        class="d-flex justify-space-between conservation-fee-cell"
      >
        <div>{{ freeEntryReason.freeEntryReason }}</div>
        <div>
          <v-btn variant="text" icon><v-icon size="x-small">mdi-delete-outline</v-icon></v-btn>
        </div>
      </v-col>
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="freeEntryReason.adultsAndChildren.adults"
          hide-details
          type="number"
          label="Adults"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="freeEntryReason.adultsAndChildren.children"
          hide-details
          type="number"
          label="Children"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="bg-primary font-size-rem-12 conservation-fee-cell">
      <v-col class="text-center"> Balance Check</v-col>
    </v-row>
    <v-row>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell"> Applied</v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        {{ appliedNumberOfConservationFeesForAdults }}</v-col
      >
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        {{ appliedNumberOfConservationFeesForChildren }}</v-col
      >
    </v-row>
    <v-row>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell"> Outstanding</v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        {{ outstandingNumberOfConservationFeesForAdults }}</v-col
      >
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        {{ outstandingNumberOfConservationFeesForChildren }}</v-col
      >
    </v-row>
  </v-container>
</template>
