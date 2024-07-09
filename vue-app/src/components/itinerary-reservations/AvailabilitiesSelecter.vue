<script setup lang="ts">
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { nextTick, ref, watch } from 'vue'
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
import DragSelect from '../common/DragSelect.vue'

const props = defineProps({
  roomTypeCode: { type: String, required: true },
  availabilities: { type: Array as () => IProtelAvailability[], required: true },
  arrivalDate: { type: Object as () => Date, required: true },
  departureDate: { type: Object as () => Date, required: true }
})

const selected = ref([])

const emits = defineEmits(['availabilities-selected'])

const updateProtelAvailabilitySelectables = () => {
  protelAvailabilitySelectables.value = []

  for (const protelAvailability of props.availabilities) {
    protelAvailabilitySelectables.value.push({
      availability: protelAvailability,
      selected: false
    })
  }
}

const handleChangeItem = (evt: any) => {
  selected.value = evt
  // @TODO: emit event to parent
}

watch(
  props.availabilities,
  async () => {
    updateProtelAvailabilitySelectables()
    await nextTick()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<template>
  <DragSelect selectorName="attr" class="d-flex" @change="handleChangeItem($event)">
    <template v-slot="{ selected }">
      <div
        v-for="availabilitySelectable of protelAvailabilitySelectables"
        :key="availabilitySelectable.availability.id"
        :ref="(el) => { availabilitySelectable.element = el}"
        :attr="availabilitySelectable.availability.id"
        :class="{'bg-yellow': selected.includes(String(availabilitySelectable.availability.id))}"
        class="text-center border-primary rounded availability-box-width"
      >
        <div
            class="mr-3 my-2 text-center"
            :class="{
          'bg-yellow': availabilitySelectable.selected,
          'bg-light': !availabilitySelectable.selected
        }"
        >
          <div class="bg-white py-1" style="margin-bottom: 0.2rem">
            {{ availabilitySelectable.availability.availability_count }}
          </div>
          <div class="bg-white py-1">
            <template v-if="availabilitySelectable.availability?.rates_data">
              {{ availabilitySelectable.availability?.rates_data[0].room_rate }}
            </template>
          </div>
        </div>
      </div>
    </template>
  </DragSelect>
</template>
