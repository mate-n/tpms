<script setup lang="ts">
import type { IProfileAddress } from '@/interfaces/profiles/IProfileAddress'

const profileAddressToBeEdited = defineModel({
  required: true,
  type: Object as () => IProfileAddress
})
</script>
<template>
  <v-card>
    <v-card-item>
      <v-card-title class="text-primary">Address I </v-card-title>
    </v-card-item>

    <v-card-text>
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
        label="Passport Number"
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
    </v-card-text>
  </v-card>
</template>
