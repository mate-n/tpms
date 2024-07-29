<script setup lang="ts">
import { DateFormatter } from '@/helpers/DateFormatter'
import { DateHelper } from '@/helpers/DateHelper'
import { ConservationFeeService } from '@/services/backend-middleware/ConservationFeeService'
import type { IProtelReservation } from '@/services/reservations/IProtelReservation'
import { ConservationFeePrices } from '@/shared/classes/ConservationFeePrices'
import type { IAdultsAndChildren } from '@/shared/interfaces/IAdultsAndChildren'
import type { ICalculatePriceOfConservationFeesBody } from '@/shared/interfaces/ICalculatePriceOfConservationFeesBody'
import type { IConservationFeePrices } from '@/shared/interfaces/IConservationFeePrices'
import type { IFreeEntryReasonWithAdultsAndChildren } from '@/shared/interfaces/IFreeEntryReasonWithAdultsAndChildren'
import type { IWildcardWithAdultsAndChildren } from '@/shared/interfaces/IWildcardWithAdultsAndChildren'
import type { AxiosStatic } from 'axios'
import { computed, inject, onMounted, ref, watch, type Ref } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'
import WildcardPopUpCard from '../profiles/WildcardPopUpCard.vue'
import { WildcardService } from '@/services/backend-middleware/WildcardService'
import { AdultsAndChildren } from '@/shared/classes/AdultsAndChildren'
import { ConservationFeePricesConverter } from '@/shared/converters/ConservationFeePricesConverter'
const conservationFeePricesConverter = new ConservationFeePricesConverter()
const axios2: AxiosStatic | undefined = inject('axios2')
const conservationFeesService = new ConservationFeeService(axios2)
const wildcardService = new WildcardService(axios2)
const dateFormatter = new DateFormatter()
const dateHelper = new DateHelper()
const emits = defineEmits(['close', 'save'])
const conservationFeePrices: Ref<IConservationFeePrices> = ref(new ConservationFeePrices())
const wildcardPopUpCardDialog = ref(false)

const reservation = defineModel({
  required: true,
  type: Object as () => IProtelReservation
})

onMounted(() => {
  southAfricanCitizens.value = {
    adults: reservation.value.conservationFeePrices.adult_sa.count,
    children: reservation.value.conservationFeePrices.child_sa.count,
    infants: reservation.value.conservationFeePrices.infant_sa.count
  }

  sadcCitizens.value = {
    adults: reservation.value.conservationFeePrices.adult_sadc.count,
    children: reservation.value.conservationFeePrices.child_sadc.count,
    infants: reservation.value.conservationFeePrices.infant_sadc.count
  }

  internationals.value = {
    adults: reservation.value.conservationFeePrices.adult_int.count,
    children: reservation.value.conservationFeePrices.child_int.count,
    infants: reservation.value.conservationFeePrices.infant_int.count
  }

  calculatePricesOfFees()
})

const southAfricanCitizens: Ref<IAdultsAndChildren> = ref(new AdultsAndChildren())
const sadcCitizens: Ref<IAdultsAndChildren> = ref(new AdultsAndChildren())
const internationals: Ref<IAdultsAndChildren> = ref(new AdultsAndChildren())

watch(
  [southAfricanCitizens, sadcCitizens, internationals],
  () => {
    calculatePricesOfFees()
  },
  { deep: true }
)

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

const appliedNumberOfConservationFeesForAdults = computed(() => {
  return (
    southAfricanCitizens.value.adults +
    sadcCitizens.value.adults +
    internationals.value.adults +
    adultsFromFreeEntryReasons.value +
    adultsFromWildcards.value
  )
})

const appliedNumberOfConservationFeesForChildren = computed(() => {
  return (
    southAfricanCitizens.value.children +
    sadcCitizens.value.children +
    internationals.value.children +
    childrenFromFreeEntryReasons.value +
    childrenFromWildcards.value
  )
})

const appliedNumberOfConsevationFeesForInfants = computed(() => {
  return (
    southAfricanCitizens.value.infants +
    sadcCitizens.value.infants +
    internationals.value.infants +
    infantsFromFreeEntryReasons.value +
    infantsFromWildcards.value
  )
})

const outstandingNumberOfConservationFeesForAdults = computed(() => {
  return (
    totalNumberOfConservationFeesForAdults.value - appliedNumberOfConservationFeesForAdults.value
  )
})

const outstandingNumberOfConservationFeesForChildren = computed(() => {
  return (
    totalNumberOfConservationFeesForChildren.value -
    appliedNumberOfConservationFeesForChildren.value
  )
})

const outstandingNumberOfConservationFeesForInfants = computed(() => {
  return (
    reservation.value.guestsPerRoom.numberOfInfants - appliedNumberOfConsevationFeesForInfants.value
  )
})

const freeEntryReasons = ref<IFreeEntryReasonWithAdultsAndChildren[]>([])
const freeEntryReasonInSelect = ref<string>('')
const addFreeEntryReason = () => {
  const newFreeEntryReason: IFreeEntryReasonWithAdultsAndChildren = {
    freeEntryReason: freeEntryReasonInSelect.value,
    adultsAndChildren: new AdultsAndChildren()
  }
  freeEntryReasons.value.push(newFreeEntryReason)
  freeEntryReasonInSelect.value = ''
}

const wildcards = ref<IWildcardWithAdultsAndChildren[]>([])
const wildcardTextField = ref<string>('')
const addWildcard = () => {
  wildcardErrorMessages.value = []
  wildcardService.checkWildcard(wildcardTextField.value).then((response) => {
    if (!response.errorCode) {
      const adults = response.beneficiaries.filter((beneficiary) => beneficiary.typeId === 'ADUL')
      const children = response.beneficiaries.filter((beneficiary) => beneficiary.typeId === 'CHIL')

      const newWildcard: IWildcardWithAdultsAndChildren = {
        wildcard: response.wildcard,
        adultsAndChildren: {
          adults: adults.length * numberOfNights.value,
          children: children.length * numberOfNights.value,
          infants: 0
        }
      }
      wildcards.value.push(newWildcard)
    } else {
      if (response.detail) {
        wildcardErrorMessages.value = [response.detail]
      } else {
        wildcardErrorMessages.value = ['Invalid wildcard']
      }
    }
  })

  wildcardTextField.value = ''
}

const getBackGroundClassForCell = (index: number) => {
  return index % 2 === 0
    ? 'conservation-fee-cell-background1 conservation-fee-cell'
    : 'conservation-fee-cell-background2 conservation-fee-cell'
}

const adultsFromWildcards = computed(() => getAdultsFromWildcards())
const childrenFromWildcards = computed(() => getChildrenFromWildcards())
const infantsFromWildcards = computed(() => getInfantsFromWildcards())

const adultsFromFreeEntryReasons = computed(() => getAdultsFromFreeEntryReasons())
const childrenFromFreeEntryReasons = computed(() => getChildrenFromFreeEntryReasons())
const infantsFromFreeEntryReasons = computed(() => getInfantsFromFreeEntryReasons())

const getAdultsFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.adults, 0)
}

const getChildrenFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.children, 0)
}

const getInfantsFromWildcards = () => {
  return wildcards.value.reduce((acc, wildcard) => acc + wildcard.adultsAndChildren.infants, 0)
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

const getInfantsFromFreeEntryReasons = () => {
  return freeEntryReasons.value.reduce(
    (acc, freeEntryReason) => acc + freeEntryReason.adultsAndChildren.infants,
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

const areAdultsFulfilled = computed(() => {
  return (
    appliedNumberOfConservationFeesForAdults.value >= totalNumberOfConservationFeesForAdults.value
  )
})

const areChildrenFulfilled = computed(() => {
  return (
    appliedNumberOfConservationFeesForChildren.value >=
    totalNumberOfConservationFeesForChildren.value
  )
})

const areInfantsFulfilled = computed(() => {
  return (
    appliedNumberOfConsevationFeesForInfants.value >=
    reservation.value.guestsPerRoom.numberOfInfants
  )
})

const isAppliedFulfilled = computed(() => {
  return areAdultsFulfilled.value && areChildrenFulfilled.value
})

const calculatePricesOfFees = () => {
  loading.value = true
  const calculatePriceOfConservationFeesBody: ICalculatePriceOfConservationFeesBody = {
    camp_id: parseInt(reservation.value.property_code),
    adult_sa: southAfricanCitizens.value.adults,
    child_sa: southAfricanCitizens.value.children,
    adult_sadc: sadcCitizens.value.adults,
    child_sadc: sadcCitizens.value.children,
    adult_int: internationals.value.adults,
    child_int: internationals.value.children
  }
  conservationFeesService
    .calculatePriceOfConservationFees(calculatePriceOfConservationFeesBody)
    .then((response) => {
      conservationFeePrices.value = response
      loading.value = false

      if (wouldWildcardBeCheaper()) {
        wildcardPopUpCardDialog.value = true
      }
    })
}

const totalConservationFeePricesForAdults = computed(() => {
  return (
    conservationFeePrices.value.summary.total_adult_int +
    conservationFeePrices.value.summary.total_adult_sadc +
    conservationFeePrices.value.summary.total_adult_sa
  )
})

const totalConservationFeePricesForChildren = computed(() => {
  return (
    conservationFeePrices.value.summary.total_child_int +
    conservationFeePrices.value.summary.total_child_sadc +
    conservationFeePrices.value.summary.total_child_sa
  )
})

const wouldWildcardBeCheaper = () => {
  if (reservation.value.guestsPerRoom.numberOfAdults === 1) {
    return (
      totalConservationFeePricesForAdults.value + totalConservationFeePricesForChildren.value > 805
    )
  }

  if (reservation.value.guestsPerRoom.numberOfAdults === 2) {
    return (
      totalConservationFeePricesForAdults.value + totalConservationFeePricesForChildren.value > 1300
    )
  }
  return (
    totalConservationFeePricesForAdults.value + totalConservationFeePricesForChildren.value > 1560
  )
}

const loading = ref(false)

const wildcardErrorMessages = ref<string[]>([])

const save = () => {
  conservationFeePrices.value.arrivalDate = reservation.value.arrivalDate
  conservationFeePrices.value.departureDate = reservation.value.departureDate
  reservation.value.conservationFeePrices =
    conservationFeePricesConverter.convertToConservationFeePrice(conservationFeePrices.value)
  emits('save')
}
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
    <div class="profiles-card-toolbar-button text-primary" @click="save()">
      <v-icon size="large">mdi-content-save-outline</v-icon>
    </div>
    <div class="profiles-card-toolbar-button rounded-te" @click="emits('close')">
      <v-icon size="large">mdi-close</v-icon>
    </div>
  </v-toolbar>
  <v-divider class="standard-dialog-card-divider"></v-divider>
  <div v-if="loading">
    <v-progress-linear color="primary" indeterminate></v-progress-linear>
  </div>
  <v-container fluid>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
      <v-col>
        {{ dateFormatter.dddotmmdotyyyy(reservation.arrivalDate) }} -
        {{ dateFormatter.dddotmmdotyyyy(reservation.departureDate) }}</v-col
      >
      <v-col> Adults </v-col>
      <v-col> Price</v-col>
      <v-col> Children </v-col>
      <v-col> Price</v-col>
      <v-col> Infants </v-col>
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
          :min="0"
        ></v-number-input>
      </v-col>
      <v-col>
        {{ conservationFeePrices.adult_sa.total }}
      </v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="southAfricanCitizens.children"
          hide-details
          label="Children"
          variant="underlined"
          density="compact"
          :min="0"
        ></v-number-input
      ></v-col>
      <v-col>
        {{ conservationFeePrices.child_sa.total }}
      </v-col>
      <v-col>
        <v-number-input
          v-model="southAfricanCitizens.infants"
          hide-details
          label="Infants"
          variant="underlined"
          density="compact"
          :min="0"
        ></v-number-input
      ></v-col>
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
          :min="0"
        ></v-number-input>
      </v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        {{ conservationFeePrices.adult_sadc.total }}
      </v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        <v-number-input
          v-model="sadcCitizens.children"
          hide-details
          label="Children"
          variant="underlined"
          density="compact"
          :min="0"
        ></v-number-input>
      </v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        {{ conservationFeePrices.child_sadc.total }}
      </v-col>
      <v-col class="conservation-fee-cell-background2 conservation-fee-cell">
        <v-number-input
          v-model="sadcCitizens.infants"
          hide-details
          label="Infants"
          variant="underlined"
          density="compact"
          :min="0"
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
          :min="0"
        ></v-number-input>
      </v-col>
      <v-col>
        {{ conservationFeePrices.adult_int.total }}
      </v-col>
      <v-col class="conservation-fee-cell-background1 conservation-fee-cell">
        <v-number-input
          v-model="internationals.children"
          hide-details
          type="number"
          label="Children"
          variant="underlined"
          density="compact"
          :min="0"
        ></v-number-input>
      </v-col>
      <v-col>
        {{ conservationFeePrices.child_int.total }}
      </v-col>
      <v-col>
        <v-number-input
          v-model="internationals.infants"
          hide-details
          label="Infants"
          variant="underlined"
          density="compact"
          :min="0"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col> Total </v-col>
      <v-col> </v-col>
      <v-col>
        {{
          conservationFeePrices.summary.total_adult_int +
          conservationFeePrices.summary.total_adult_sadc +
          conservationFeePrices.summary.total_adult_sa
        }}
      </v-col>
      <v-col> </v-col>
      <v-col>
        {{
          conservationFeePrices.summary.total_child_int +
          conservationFeePrices.summary.total_child_sadc +
          conservationFeePrices.summary.total_child_sa
        }}
      </v-col>
    </v-row>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
      <v-col cols="4"> Wildcards </v-col>
      <v-col cols="8" class="d-flex align-center">
        <v-text-field
          label="Enter Wildcard"
          class="me-2"
          density="compact"
          :errorMessages="wildcardErrorMessages"
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
          :min="0"
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
          :min="0"
        ></v-number-input>
      </v-col>
      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="wildcard.adultsAndChildren.infants"
          hide-details
          type="number"
          label="Infants"
          variant="underlined"
          density="compact"
          :min="0"
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
          :min="0"
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
          :min="0"
        ></v-number-input>
      </v-col>

      <v-col :class="getBackGroundClassForCell(index)" class="conservation-fee-cell">
        <v-number-input
          v-model="freeEntryReason.adultsAndChildren.infants"
          hide-details
          type="number"
          label="Infants"
          variant="underlined"
          density="compact"
          :min="0"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="conservation-fee-cell-background2 font-size-rem-12 conservation-fee-cell">
      <v-col class="text-center"> Balance Check</v-col>
    </v-row>
    <v-row>
      <v-col
        cols="2"
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': isAppliedFulfilled,
          'bg-amber-lighten-4': !isAppliedFulfilled
        }"
      >
        Applied</v-col
      >
      <v-col
        cols="4"
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': areAdultsFulfilled,
          'bg-amber-lighten-4': !areAdultsFulfilled
        }"
      >
        {{ appliedNumberOfConservationFeesForAdults }}</v-col
      >
      <v-col
        cols="4"
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': areChildrenFulfilled,
          'bg-amber-lighten-4': !areChildrenFulfilled
        }"
      >
        {{ appliedNumberOfConservationFeesForChildren }}</v-col
      >
      <v-col
        cols="2"
        class="conservation-fee-cell-background1 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': areInfantsFulfilled,
          'bg-amber-lighten-4': !areInfantsFulfilled
        }"
      >
        {{ appliedNumberOfConsevationFeesForInfants }}
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="2"
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': isAppliedFulfilled,
          'bg-amber-lighten-4': !isAppliedFulfilled
        }"
      >
        Outstanding</v-col
      >
      <v-col
        cols="4"
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': areAdultsFulfilled,
          'bg-amber-lighten-4': !areAdultsFulfilled
        }"
      >
        {{ outstandingNumberOfConservationFeesForAdults }}</v-col
      >
      <v-col
        cols="4"
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': areChildrenFulfilled,
          'bg-amber-lighten-4': !areChildrenFulfilled
        }"
      >
        {{ outstandingNumberOfConservationFeesForChildren }}</v-col
      >
      <v-col
        cols="2"
        class="conservation-fee-cell-background2 conservation-fee-cell"
        :class="{
          'bg-light-green-lighten-5': areInfantsFulfilled,
          'bg-amber-lighten-4': !areInfantsFulfilled
        }"
      >
        {{ outstandingNumberOfConservationFeesForInfants }}
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="wildcardPopUpCardDialog" scrollable auto width="500">
    <v-card>
      <WildcardPopUpCard
        @close="wildcardPopUpCardDialog = false"
        @ok="wildcardPopUpCardDialog = false"
      ></WildcardPopUpCard>
    </v-card>
  </v-dialog>
</template>
