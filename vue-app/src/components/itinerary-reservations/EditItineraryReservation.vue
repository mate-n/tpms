<script setup lang="ts">
import { CloneHelper } from '@/helpers/CloneHelper'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { onMounted, ref, watch } from 'vue'
import ItineraryReservationForm from './ItineraryReservationForm.vue'

const cloneHelper = new CloneHelper()
defineEmits(['close', 'update'])
const props = defineProps({
  itineraryReservationInput: { type: Object as () => IItineraryReservation, required: true }
})
const itineraryReservationToBeEdited = ref<IItineraryReservation>(new ItineraryReservation())

onMounted(() => {
  itineraryReservationToBeEdited.value = cloneHelper.clone(props.itineraryReservationInput)
})

watch(props, (newInput) => {
  itineraryReservationToBeEdited.value = cloneHelper.clone(newInput.itineraryReservationInput)
})
</script>
<template>
  <ItineraryReservationForm
    :itineraryReservationInput="itineraryReservationToBeEdited"
  ></ItineraryReservationForm>
</template>
