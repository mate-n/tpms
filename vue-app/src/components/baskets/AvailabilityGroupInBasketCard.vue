<script setup lang="ts">
import { AvailabilityGroupHelper } from '@/helpers/AvailabilityGroupHelper'
import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'
import { onBeforeMount } from 'vue'
const availabilityGroupHelper = new AvailabilityGroupHelper()
const props = defineProps({
  availabilityGroup: { type: Object as () => IProtelAvailabilityGroup, required: true }
})
onBeforeMount(() => {
  availabilityGroupHelper.sortByDate(props.availabilityGroup)
})
</script>

<template>
  <div v-for="availability of availabilityGroup.availabilities" :key="availability.id">
    <div>
      <div>{{ availability.availability_count }}</div>
      <div>{{ availability.id }}</div>
    </div>
  </div>
</template>
