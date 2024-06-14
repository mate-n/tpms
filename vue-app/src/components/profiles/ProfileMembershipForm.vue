<script setup lang="ts">
import { RomanNumeralConverter } from '@/helpers/RomanNumeralConverter'
import type { IProfileMembershipCard } from '@/shared/interfaces/profiles/IProfileMembershipCard'

const romanNumeralConverter = new RomanNumeralConverter()
defineProps({
  indexOfMembership: { type: Number, required: true }
})
defineEmits(['delete', 'changeMailingAddress'])
const profileMembershipToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileMembershipCard
})
</script>
<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="text-primary">
          Membership {{ romanNumeralConverter.toRoman(indexOfMembership + 1) }}</v-col
        >
        <v-col class="d-flex justify-end">
          <v-btn
            @click="$emit('delete', profileMembershipToBeEdited)"
            density="compact"
            class="elevation-1 text-center mt-3 px-2 profiles-pill"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
      <v-text-field
        v-model="profileMembershipToBeEdited.membershipName"
        label="Membership Name"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="profileMembershipToBeEdited.cardNumber"
        label="Card Number"
        variant="underlined"
        type="number"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>
