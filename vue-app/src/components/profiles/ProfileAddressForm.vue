<script setup lang="ts">
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'

const emits = defineEmits(['delete'])
const profileAddressToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileAddress
})
</script>
<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col class="text-primary"> Address I </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            @click="$emit('delete')"
            density="compact"
            class="elevation-1 text-center mt-3 px-2 profiles-pill"
            >Delete</v-btn
          >
        </v-col>
      </v-row>
      <v-select
        v-model="profileAddressToBeEdited.type"
        label="Type"
        variant="underlined"
        :items="['Business', 'Home', 'Other']"
        item-title="value"
        item-value="id"
        class="me-3"
      ></v-select>
      <v-text-field
        v-model="profileAddressToBeEdited.recipient"
        label="Recipient"
        variant="underlined"
      ></v-text-field>

      <v-select
        v-model="profileAddressToBeEdited.country"
        label="Country"
        variant="underlined"
        :items="['Business', 'Home', 'Other']"
        item-title="value"
        item-value="id"
        class="me-3"
      ></v-select>

      <v-row>
        <v-col>
          <v-text-field
            v-model="profileAddressToBeEdited.zip"
            label="ZIP / Postal Code"
            variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="profileAddressToBeEdited.city"
            label="City"
            variant="underlined"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="profileAddressToBeEdited.state"
        label="State / Province / Region"
        variant="underlined"
      ></v-text-field>
      <v-text-field
        v-model="profileAddressToBeEdited.street1"
        label="Street Address"
        variant="underlined"
      ></v-text-field>
      <v-text-field v-model="profileAddressToBeEdited.street2" variant="underlined"></v-text-field>
      <v-text-field v-model="profileAddressToBeEdited.street3" variant="underlined"></v-text-field>
      <v-checkbox v-model="profileAddressToBeEdited.primary" label="Mailing Address"></v-checkbox>
    </v-card-text>
  </v-card>
</template>
