<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { CrudOperations } from '@/enums/CrudOperations'
import { CloneHelper } from '@/helpers/CloneHelper'
import type { IProfile } from '@/shared/interfaces/profiles/IProfile'
import ReservationForm from './ReservationForm.vue'
import type { IReservation } from '@/shared/interfaces/IReservation'
import { Reservation } from '@/shared/classes/Reservation'

const cloneHelper = new CloneHelper()
const emit = defineEmits(['close', 'update'])
const props = defineProps({
  reservationInput: { type: Object as () => IReservation, required: true }
})
const reservationToBeEdited = ref<IReservation>(new Reservation())
const update = (profile: IProfile) => {
  emit('update', profile)
}

onMounted(() => {
  reservationToBeEdited.value = cloneHelper.clone(props.reservationInput)
})

watch(props, (newInput) => {
  reservationToBeEdited.value = cloneHelper.clone(newInput.reservationInput)
})
</script>
<template>
  <ReservationForm
    :reservation-input="reservationToBeEdited"
    @save="(profile) => update(profile)"
    :crud-operation="CrudOperations.Update"
  ></ReservationForm>
</template>
