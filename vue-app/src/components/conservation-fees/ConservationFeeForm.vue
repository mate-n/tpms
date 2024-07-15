<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import type { IAdultsAndChildren } from '@/shared/interfaces/IAdultsAndChildren'
import type { IFreeEntryReasonWithAdultsAndChildren } from '@/shared/interfaces/IFreeEntryReasonWithAdultsAndChildren'
import type { IWildcardWithAdultsAndChildren } from '@/shared/interfaces/IWildcardWithAdultsAndChildren'
import { computed, ref, type Ref } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()
const emits = defineEmits(['close'])

const reservation = defineModel({
  required: true,
  type: Object as () => IProtelReservation
})

const southAfricanCitizens: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0, seniors: 0 })
const sadcCitizens: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0, seniors: 0 })
const internationals: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0, seniors: 0 })

const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    reservation.value.arrivalDate,
    reservation.value.departureDate
  )
})

const totalNumberOfConservationFeesForAdults = computed(() => {
  return reservation.value.guestsPerRoom.numberOfAdults * numberOfNights.value
})

const totalNumberOfConservationFeesForChildren = computed(() => {
  return reservation.value.guestsPerRoom.numberOfChildren * numberOfNights.value
})

const totalNumberOfConservationFeesForSeniors = computed(() => {
  return reservation.value.guestsPerRoom.numberOfSeniors * numberOfNights.value
})

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

const appliedNumberOfConservationFeesForSeniors = computed(() => {
  return (
    southAfricanCitizens.value.seniors + sadcCitizens.value.seniors + internationals.value.seniors
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

const outstandingNumberOfConservationFeesForSeniors = computed(() => {
  return (
    totalNumberOfConservationFeesForSeniors.value -
    appliedNumberOfConservationFeesForSeniors.value -
    seniorsFromFreeEntryReasons.value -
    seniorsFromWildcards.value
  )
})

const freeEntryReasons = ref<IFreeEntryReasonWithAdultsAndChildren[]>([])
const freeEntryReasonInSelect = ref<string>('')
const addFreeEntryReason = () => {
  const newFreeEntryReason: IFreeEntryReasonWithAdultsAndChildren = {
    freeEntryReason: freeEntryReasonInSelect.value,
    adultsAndChildren: { adults: 0, children: 0, seniors: 0 }
  }
  freeEntryReasons.value.push(newFreeEntryReason)
  freeEntryReasonInSelect.value = ''
}

const wildcards = ref<IWildcardWithAdultsAndChildren[]>([])
const wildcardTextField = ref<string>('')
const addWildcard = () => {
  const newWildcard: IWildcardWithAdultsAndChildren = {
    wildcard: wildcardTextField.value,
    adultsAndChildren: { adults: 0, children: 0, seniors: 0 }
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
const seniorsFromWildcards = computed(() => getSeniorsFromWildcards())

const adultsFromFreeEntryReasons = computed(() => getAdultsFromFreeEntryReasons())
const childrenFromFreeEntryReasons = computed(() => getChildrenFromFreeEntryReasons())
const seniorsFromFreeEntryReasons = computed(() => getSeniorsFromFreeEntryReasons())

const getAdultsFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.adults, 0)
}

const getChildrenFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.children, 0)
}

const getSeniorsFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.seniors, 0)
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

const getSeniorsFromFreeEntryReasons = () => {
  return freeEntryReasons.value.reduce(
    (acc, freeEntryReason) => acc + freeEntryReason.adultsAndChildren.seniors,
    0
  )
}

const removeWildcardFromWildcards = (wildcard: string) => {
  wildcards.value = wildcards.value.filter((w) => w.wildcard !== wildcard)
}

const removeFreeEntryReasonFromFreeEntryReasons = (freeEntryReason: string) => {
  freeEntryReasons.value = freeEntryReasons.value.filter(
    (f) => f.freeEntryReason !== freeEntryReason
  )
}

const isAppliedFulfilled = computed(() => {
  return (
    appliedNumberOfConservationFeesForAdults.value ===
      totalNumberOfConservationFeesForAdults.value &&
    appliedNumberOfConservationFeesForChildren.value ===
      totalNumberOfConservationFeesForChildren.value &&
    appliedNumberOfConservationFeesForSeniors.value ===
      totalNumberOfConservationFeesForSeniors.value
  )
})
</script>
<style scoped>
.conservation-fee-cell-background1 {
  background-color: white;
}

.conservation-fee-cell-background2 {
  background-color: #f8f8f8;
}

.conservation-fee-cell {
  border: 0.15rem solid white;
}
</style>

<template>
  <v-toolbar class="standard-dialog-card-toolbar">
    <v-toolbar-title><span class="text-primary">Conservation Fees</span></v-toolbar-title>
    <div class="profiles-card-toolbar-button text-primary">
      <v-icon size="large">mdi-content-save-outline</v-icon>
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="standard-dialog-card-divider"></v-divider>

  <v-container fluid>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
      <v-col>
        {{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }} -
        {{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}</v-col
      >
      <v-col> Adults </v-col>
      <v-col> Children </v-col>
      <v-col> Seniors </v-col>
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
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="southAfricanCitizens.seniors"
          hide-details
          label="Seniors"
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
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        <v-number-input
          v-model="sadcCitizens.seniors"
          hide-details
          label="Seniors"
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
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="internationals.seniors"
          hide-details
          type="number"
          label="Seniors"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
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

    <v-row v-for="(wildcard, index) of wildcards" :key="wildcard.wildcard">
      <v-col
        :class="getBackGroundClassForCell(index)"
        class="conservation-fee-cell d-flex justify-space-between"
      >
        <div>
          {{ wildcard.wildcard }}
        </div>

        <div>
          <v-btn variant="text" icon @click="removeWildcardFromWildcards(wildcard.wildcard)"
            ><v-icon size="x-small">mdi-delete-outline</v-icon></v-btn
          >
        </div></v-col
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
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="wildcard.adultsAndChildren.seniors"
          hide-details
          type="number"
          label="Seniors"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
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
    <v-row
      v-for="(freeEntryReason, index) of freeEntryReasons"
      :key="freeEntryReason.freeEntryReason"
    >
      <v-col
        :class="getBackGroundClassForCell(index)"
        class="d-flex justify-space-between conservation-fee-cell"
      >
        <div>{{ freeEntryReason.freeEntryReason }}</div>
        <div>
          <v-btn
            variant="text"
            icon
            @click="removeFreeEntryReasonFromFreeEntryReasons(freeEntryReason.freeEntryReason)"
            ><v-icon size="x-small">mdi-delete-outline</v-icon></v-btn
          >
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
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="freeEntryReason.adultsAndChildren.seniors"
          hide-details
          type="number"
          label="Seniors"
          variant="underlined"
          density="compact"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
      <v-col class="text-center"> Balance Check</v-col>
    </v-row>
    <v-row>
      <v-col
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': isAppliedFulfilled,
          'bg-amber-lighten-4': !isAppliedFulfilled
        }"
      >
        Applied</v-col
      >
      <v-col
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5':
            appliedNumberOfConservationFeesForAdults === totalNumberOfConservationFeesForAdults,
          'bg-amber-lighten-4':
            appliedNumberOfConservationFeesForAdults !== totalNumberOfConservationFeesForAdults
        }"
      >
        {{ appliedNumberOfConservationFeesForAdults }}</v-col
      >
      <v-col
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5':
            appliedNumberOfConservationFeesForChildren === totalNumberOfConservationFeesForChildren,
          'bg-amber-lighten-4':
            appliedNumberOfConservationFeesForChildren !== totalNumberOfConservationFeesForChildren
        }"
      >
        {{ appliedNumberOfConservationFeesForChildren }}</v-col
      >
      <v-col
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5':
            appliedNumberOfConservationFeesForSeniors === totalNumberOfConservationFeesForSeniors,
          'bg-amber-lighten-4':
            appliedNumberOfConservationFeesForSeniors !== totalNumberOfConservationFeesForSeniors
        }"
      >
        {{ appliedNumberOfConservationFeesForSeniors }}</v-col
      >
    </v-row>
    <v-row>
      <v-col
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': isAppliedFulfilled,
          'bg-amber-lighten-4': !isAppliedFulfilled
        }"
      >
        Outstanding</v-col
      >
      <v-col
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5':
            appliedNumberOfConservationFeesForAdults === totalNumberOfConservationFeesForAdults,
          'bg-amber-lighten-4':
            appliedNumberOfConservationFeesForAdults !== totalNumberOfConservationFeesForAdults
        }"
      >
        {{ outstandingNumberOfConservationFeesForAdults }}</v-col
      >
      <v-col
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5':
            appliedNumberOfConservationFeesForChildren === totalNumberOfConservationFeesForChildren,
          'bg-amber-lighten-4':
            appliedNumberOfConservationFeesForChildren !== totalNumberOfConservationFeesForChildren
        }"
      >
        {{ outstandingNumberOfConservationFeesForChildren }}</v-col
      >
      <v-col
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5':
            appliedNumberOfConservationFeesForSeniors === totalNumberOfConservationFeesForSeniors,
          'bg-amber-lighten-4':
            appliedNumberOfConservationFeesForSeniors !== totalNumberOfConservationFeesForSeniors
        }"
      >
        {{ outstandingNumberOfConservationFeesForSeniors }}
      </v-col>
    </v-row>
  </v-container>
</template>
