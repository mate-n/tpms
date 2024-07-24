<script setup lang="ts">
import { GuestsPerRoomHelper } from '@/helpers/GuestsPerRoomHelper'
import type { GuestsPerRoom } from '@/shared/classes/GuestsPerRoom'
import { computed, ref } from 'vue'
import { VNumberInput } from 'vuetify/labs/VNumberInput'

const guestsPerRoomHelper = new GuestsPerRoomHelper()
const guestsPerRoom = defineModel({
  required: true,
  type: Object as () => GuestsPerRoom
})

const emit = defineEmits(['update:modelValue'])

defineProps({
  readonly: {
    type: Boolean,
    required: false
  },
  errors: {
    type: Object as () => Record<string, string> | undefined,
    required: false
  }
})

const totalGuests = computed(() => {
  return guestsPerRoomHelper.getTotalNumberOfGuests(guestsPerRoom.value)
})

const guestsPerRoomMenu = ref(false)

const handleUpdate = (values: Partial<GuestsPerRoom>) => {
  emit('update:modelValue', { ...guestsPerRoom.value, ...values })
}
</script>
<template>
  <v-menu v-model="guestsPerRoomMenu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="totalGuests"
        label="Guests per Room"
        variant="underlined"
        :error-messages="errors && errors['guestsPerRoom']"
        :readonly="readonly"
        v-bind="props"
      ></v-text-field>
    </template>
    <v-card min-width="250">
      <v-card-text>
        <v-number-input
          v-model="guestsPerRoom.numberOfAdults"
          controlVariant="stacked"
          variant="underlined"
          label="Adult"
          :inset="true"
          :min="0"
          :readonly="readonly"
          @update:model-value="(val) => handleUpdate({ numberOfAdults: val })"
        ></v-number-input>
        <v-number-input
          v-model="guestsPerRoom.numberOfInfants"
          label="Infant"
          :inset="true"
          controlVariant="stacked"
          variant="underlined"
          :min="0"
          :readonly="readonly"
          @update:model-value="(val) => handleUpdate({ numberOfInfants: val })"
        ></v-number-input>

        <v-number-input
          v-model="guestsPerRoom.numberOfChildren"
          label="Child"
          :inset="true"
          controlVariant="stacked"
          variant="underlined"
          :min="0"
          :readonly="readonly"
          @update:model-value="(val) => handleUpdate({ numberOfChildren: val })"
        ></v-number-input>

        <v-number-input
          v-model="guestsPerRoom.numberOfSeniors"
          label="Senior"
          :inset="true"
          controlVariant="stacked"
          variant="underlined"
          :min="0"
          :readonly="readonly"
          @update:model-value="(val) => handleUpdate({ numberOfSeniors: val })"
        ></v-number-input>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
