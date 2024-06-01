<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { CloneHelper } from '@/helpers/CloneHelper'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import { ItineraryReservation } from '@/shared/classes/ItineraryReservation'
import ItineraryReservationForm from './ItineraryReservationForm.vue'
const cloneHelper = new CloneHelper()
const emit = defineEmits(['close', 'update'])
const props = defineProps({
  itineraryReservationInput: { type: Object as () => IItineraryReservation, required: true }
})
const itineraryReservationToBeEdited = ref<IItineraryReservation>(new ItineraryReservation())
const update = (profile: IProfile) => {
  emit('update', profile)
}

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
