<script setup lang="ts">
import { DateHelper } from '@/helpers/DateHelper'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { computed, onMounted, ref, watch, type Ref } from 'vue'
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
const dateHelper = new DateHelper()
const props = defineProps({
  protelAvailabilities: { type: Object as () => IProtelAvailability[], required: true }
})

watch(
  props,
  () => {
    protelAvailabilitySelectables.value = []
    for (const protelAvailability of props.protelAvailabilities) {
      protelAvailabilitySelectables.value.push({
        availability: protelAvailability,
        selected: false
      })
    }
  },
  {
    immediate: true
  }
)

const emits = defineEmits(['selectedProtelAvailabilities'])

const overlayDivEndX = ref<number>(0)
const overlayDivStartX = ref<number>(0)

const leftHandle = ref<HTMLDivElement | null>(null)
const rightHandle = ref<HTMLDivElement | null>(null)
const overlayDiv = ref<HTMLDivElement | null>(null)

const mouseDownOnRightHandle = (e: MouseEvent) => {
  if (!overlayDiv.value) return

  const startPos = {
    x: e.clientX,
    y: e.clientY
  }

  const w = parseInt(overlayDiv.value.style.width, 10)

  const handleMouseMove = (e: MouseEvent) => {
    if (!overlayDiv.value) return
    overlayDivStartX.value = overlayDiv.value.getBoundingClientRect().x
    overlayDivEndX.value =
      overlayDiv.value.getBoundingClientRect().x + overlayDiv.value.getBoundingClientRect().width

    const dx = e.clientX - startPos.x
    overlayDiv.value.style.width = `${w + dx}px`
  }

  const handleMouseUp = () => {
    protelAvailabilitySelectables.value.forEach((p) => (p.selected = false))
    for (const item of itemRefs.value) {
      const itemStartX = item.getBoundingClientRect().x
      const itemEndX = item.getBoundingClientRect().x + item.getBoundingClientRect().width
      if (overlayDivStartX.value < itemEndX && overlayDivEndX.value > itemStartX) {
        protelAvailabilitySelectables.value[itemRefs.value.indexOf(item)].selected = true
      }
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    emits(
      'selectedProtelAvailabilities',
      protelAvailabilitySelectables.value.map((p) => p.availability)
    )
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const mouseDownOnLeftHandle = (e: MouseEvent) => {
  if (!overlayDiv.value) return

  const startPos = {
    x: e.clientX,
    y: e.clientY
  }

  const startX = parseInt(overlayDiv.value.style.left)

  const handleMouseMove = (e: MouseEvent) => {
    if (!overlayDiv.value) return
    overlayDivStartX.value = overlayDiv.value.getBoundingClientRect().x
    overlayDivEndX.value =
      overlayDiv.value.getBoundingClientRect().x + overlayDiv.value.getBoundingClientRect().width

    const dx = e.clientX - startPos.x
    overlayDiv.value.style.left = `${startX + dx}px`
  }

  const handleMouseUp = () => {
    protelAvailabilitySelectables.value.forEach((p) => (p.selected = false))
    for (const item of itemRefs.value) {
      const itemStartX = item.getBoundingClientRect().x
      const itemEndX = item.getBoundingClientRect().x + item.getBoundingClientRect().width
      if (overlayDivStartX.value < itemEndX && overlayDivEndX.value > itemStartX) {
        protelAvailabilitySelectables.value[itemRefs.value.indexOf(item)].selected = true
      }
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    emits(
      'selectedProtelAvailabilities',
      protelAvailabilitySelectables.value.map((p) => p.availability)
    )
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
  if (!overlayDiv.value) return
  overlayDiv.value.style.left = '10px'
  overlayDiv.value.style.width = '100px'
})

const itemRefs: Ref<HTMLDivElement[]> = ref([])
const numberOfNights = computed(() => {
  return dateHelper.calculateNightsBetweenDates(
    protelAvailabilitySelectables.value[0]?.availability?.availability_start,
    protelAvailabilitySelectables.value[protelAvailabilitySelectables.value.length - 1]
      ?.availability?.availability_end
  )
})
</script>
<style scoped>
.resizable {
  position: relative;
  border-radius: 0.25rem;
  height: 2rem;
  width: 50px;
  background-color: #5cb4ef;
  opacity: 0.8;
}
.resizer {
  position: absolute;
}

.resizer--r {
  cursor: col-resize;

  right: 0;
  top: 50%;
  transform: translate(50%, -50%);

  height: 2rem;
  width: 0.25rem;
}

.resizer--l {
  cursor: col-resize;

  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);

  height: 2rem;
  width: 0.25rem;
}

.resizer {
  background: transparent;
}
.resizable:hover .resizer {
  background: rgb(99 102 241);
}
</style>
<template>
  <div class="d-flex" style="position: relative">
    <div class="resizable text-white" ref="overlayDiv" style="position: absolute">
      <div
        class="resizer resizer--l"
        ref="leftHandle"
        @mousedown="mouseDownOnLeftHandle($event)"
      ></div>
      <div class="d-flex align-center justify-space-between h-100 w-100">
        <div @mousedown="mouseDownOnLeftHandle($event)">
          <v-icon color="white">mdi-menu-left</v-icon>
        </div>
        <div>
          {{ numberOfNights }}
        </div>
        <div @mousedown="mouseDownOnRightHandle($event)">
          <v-icon color="white">mdi-menu-right</v-icon>
        </div>
      </div>

      <div
        class="resizer resizer--r"
        ref="rightHandle"
        @mousedown="mouseDownOnRightHandle($event)"
      ></div>
      <div class="resizer resizer--b" />
    </div>
    <div
      v-for="availabilitySelectable of protelAvailabilitySelectables"
      :key="availabilitySelectable.availability.id"
      ref="itemRefs"
      class="text-center border-primary rounded"
      style="width: 6rem"
    >
      <div
        class="mr-3 px-5 py-2 my-2 text-center"
        :class="{
          'bg-primary': availabilitySelectable.selected,
          'bg-white': !availabilitySelectable.selected
        }"
      >
        {{ availabilitySelectable.availability?.rates_data[0]?.room_rate }}
      </div>
    </div>
  </div>
</template>
