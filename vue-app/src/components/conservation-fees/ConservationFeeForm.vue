<script setup lang="ts">
import type { IAdultsAndChildren } from '@/shared/interfaces/IAdultsAndChildren'
import { computed, ref, type Ref } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const southAfricanCitizens: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0 })
const sadcCitizens: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0 })
const internationals: Ref<IAdultsAndChildren> = ref({ adults: 0, children: 0 })

const totalNumberOfConservationFeesForAdults = ref(0)
const totalNumberOfConservationFeesForChildren = ref(0)

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
</script>

<template>
  <v-container>
    <v-row class="bg-primary font-size-rem-12">
      <v-col> 19 - 26 July 2024 </v-col>
      <v-col> Adults </v-col>
      <v-col> Children </v-col>
    </v-row>
    <v-row>
      <v-col> South African Citizens and Residents </v-col>
      <v-col>
        <v-number-input
          v-model="southAfricanCitizens.adults"
          label="Adults"
          variant="underlined"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          v-model="southAfricanCitizens.children"
          label="Children"
          variant="underlined"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col> SADC Citizens </v-col>
      <v-col>
        <v-number-input
          v-model="sadcCitizens.adults"
          label="Adults"
          variant="underlined"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          v-model="sadcCitizens.children"
          label="Children"
          variant="underlined"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row>
      <v-col> International (non-South African Citizens) </v-col>
      <v-col>
        <v-number-input
          v-model="internationals.adults"
          label="Adults"
          variant="underlined"
        ></v-number-input>
      </v-col>
      <v-col>
        <v-number-input
          v-model="internationals.children"
          type="number"
          label="Children"
          variant="underlined"
        ></v-number-input>
      </v-col>
    </v-row>
    <v-row class="bg-primary font-size-rem-12">
      <v-col> Wildcards </v-col>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col> 1300030608 <v-btn> + ADD</v-btn></v-col>
      <v-col>
        <v-text-field label="Adults" variant="underlined"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Children" variant="underlined"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col> All Parks Cluster Couples Card for 2 Adults: Expiry</v-col>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row class="bg-primary font-size-rem-12">
      <v-col> Free Entry Reasons </v-col>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col> Dropdown list: User to select</v-col>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col> Guest of Staff</v-col>
      <v-col>
        <v-text-field label="Adults" variant="underlined"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field label="Children" variant="underlined"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="bg-primary font-size-rem-12">
      <v-col class="text-center"> Balance Check</v-col>
    </v-row>
    <v-row>
      <v-col> Applied</v-col>
      <v-col> {{ appliedNumberOfConservationFeesForAdults }}</v-col>
      <v-col> {{ appliedNumberOfConservationFeesForChildren }}</v-col>
    </v-row>
    <v-row>
      <v-col> Outstanding</v-col>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>
