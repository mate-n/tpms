<script setup lang="ts">
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { nextTick, ref, watch } from 'vue'
const isSelecting = ref<boolean>(false)
const startSelectingAt = ref<IProtelAvailabilitySelectable | null>(null)
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
const props = defineProps({
  roomTypeCode: { type: String, required: true },
  availabilities: { type: Array as () => IProtelAvailability[], required: true },
  arrivalDate: { type: Object as () => Date, required: true },
  departureDate: { type: Object as () => Date, required: true }
})

const emits = defineEmits(['availabilities-selected'])

const resetProtelAvailabilitySelectables = () => {
  protelAvailabilitySelectables.value = []

  for (const protelAvailability of props.availabilities) {
    protelAvailabilitySelectables.value.push({
      availability: protelAvailability,
      selected: false
    })
  }
}

const updateAvailabilitySelectables = (availability: IProtelAvailability, selected?: boolean) => {
  protelAvailabilitySelectables.value = protelAvailabilitySelectables.value.map(
    (item: IProtelAvailabilitySelectable) => {
      if (availability.id !== item.availability.id) return item;
      return { ...item, selected };
    }
  );

  const selectedAvailabilities = protelAvailabilitySelectables.value
    .filter(({ selected }) => selected)
    .map(({ availability }) => availability);

  emits('availabilities-selected', selectedAvailabilities);
};

const handleMouseDown = (availabilitySelectable: IProtelAvailabilitySelectable, event: MouseEvent) => {
  const { availability, selected } = availabilitySelectable;

  // toggle selected item by holding "ctrl" key
  if (event.ctrlKey || event.metaKey) {
    updateAvailabilitySelectables(availability, !selected);
    return;
  }

  // start "Selecting" flow
  isSelecting.value = true;
  startSelectingAt.value = availabilitySelectable;
  resetProtelAvailabilitySelectables();
  updateAvailabilitySelectables(availability, true);
}

const handleMouseMove = ({ availability }: IProtelAvailabilitySelectable) => {
  if (!isSelecting.value) return;

  // select item when the mouse is moving over it
  updateAvailabilitySelectables(availability, true);
}

const handleMouseLeave = ({ availability }: IProtelAvailabilitySelectable, event: MouseEvent) => {
  if (!isSelecting.value || !startSelectingAt.value?.element) return;

  // mouse is leaving from the start item, don't need to check it
  if (startSelectingAt.value.availability?.id === availability.id) {
    return;
  }

  // mouse is leaving from the another item, we should check if user want to select this item
  const itemElement = event.target as HTMLDivElement;
  const startAtElement = startSelectingAt.value.element as HTMLDivElement;
  
  const { clientX: mouseX } = event;
  const { x: itemX, left: itemLeft, right: itemRight } = itemElement.getBoundingClientRect();
  const { x: startX } = startAtElement.getBoundingClientRect();


  let selected = false;
  if (startX < itemX) {
    // user is selecting from left to right
    selected = mouseX >= itemRight;
  } else {
    // user is selecting from right to left
    selected = mouseX <= itemLeft;
  }
  updateAvailabilitySelectables(availability, selected);
}

const handleMouseUp = () => {
  // stop "Selecting" flow
  isSelecting.value = false;
  startSelectingAt.value = null;
}

watch(
  props.availabilities,
  async () => {
    resetProtelAvailabilitySelectables()
    await nextTick()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
<template>
  <div class="d-flex">
    <div
      v-for="availabilitySelectable of protelAvailabilitySelectables"
      :key="availabilitySelectable.availability.id"
      class="text-center border-primary rounded availability-box-width"
    >
      <div
        class="mr-3 my-2 text-center cursor-pointer bg-light"
        :ref="
          (el) => {
            availabilitySelectable.element = el
          }
        "
        @mousedown="handleMouseDown(availabilitySelectable, $event)"
        @mousemove="handleMouseMove(availabilitySelectable)"
        @mouseleave="handleMouseLeave(availabilitySelectable, $event)"
        @mouseup="handleMouseUp()"
      >
        <div
          class="py-1"
          :class="{
            'bg-yellow': availabilitySelectable.selected,
            'bg-white': !availabilitySelectable.selected
          }"
          style="margin-bottom: 0.2rem; user-select: none;"
        >
          {{ availabilitySelectable.availability.availability_count }}
        </div>
        <div
          class="py-1"
          :class="{
            'bg-yellow': availabilitySelectable.selected,
            'bg-white': !availabilitySelectable.selected
          }"
          style="user-select: none;"
        >
          <template v-if="availabilitySelectable.availability?.rates_data">
            {{ availabilitySelectable.availability?.rates_data[0].room_rate }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
