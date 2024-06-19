<script setup lang="ts">
import { DateHelper } from '@/helpers/DateHelper'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
const selectedProtelAvailabilitySelectables = computed(() =>
  protelAvailabilitySelectables.value.filter((p) => p.selected)
)
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
const overlayDiv = ref<HTMLDivElement | null>(null as HTMLDivElement | null)

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
    setSelectedProtelAvailabilities()

    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    afterMouseUp()
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
  const w = parseInt(overlayDiv.value.style.width, 10)

  const handleMouseMove = (e: MouseEvent) => {
    if (!overlayDiv.value) return
    overlayDivStartX.value = overlayDiv.value.getBoundingClientRect().x
    overlayDivEndX.value =
      overlayDiv.value.getBoundingClientRect().x + overlayDiv.value.getBoundingClientRect().width

    const dx = e.clientX - startPos.x
    overlayDiv.value.style.left = `${startX + dx}px`
    overlayDiv.value.style.width = `${w - dx}px`
  }

  const handleMouseUp = () => {
    setSelectedProtelAvailabilities()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    afterMouseUp()
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const mouseDownCenterHandle = (e: MouseEvent) => {
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
    setSelectedProtelAvailabilities()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    afterMouseUp()
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const afterMouseUp = () => {
  if (selectedProtelAvailabilitySelectables.value.length < 2) {
    showSelectBar.value = false
    if (overlayDiv.value) overlayDiv.value.style.width = '100px'
    protelAvailabilitySelectables.value.forEach((p) => (p.selected = false))
  }

  emits(
    'selectedProtelAvailabilities',
    protelAvailabilitySelectables.value.map((p) => p.availability)
  )
}

onMounted(() => {
  if (!overlayDiv.value) return
  overlayDiv.value.style.left = '10px'
  overlayDiv.value.style.width = '100px'
})

const setSelectedProtelAvailabilities = () => {
  protelAvailabilitySelectables.value.forEach((p) => (p.selected = false))

  for (const selectable of protelAvailabilitySelectables.value) {
    const itemStartX = selectable.element.getBoundingClientRect().x
    const itemEndX =
      selectable.element.getBoundingClientRect().x +
      selectable.element.getBoundingClientRect().width
    if (overlayDivStartX.value < itemEndX && overlayDivEndX.value > itemStartX) {
      selectable.selected = true
    }
  }

  updateWidthOfOverlay()
}

const getSelectedWithHighestX = () => {
  let highestX = 0
  let highestSelectable = selectedProtelAvailabilitySelectables.value[0]
  for (const selectable of selectedProtelAvailabilitySelectables.value) {
    if (selectable.element.getBoundingClientRect().x > highestX) {
      highestX = selectable.element.getBoundingClientRect().x
      highestSelectable = selectable
    }
  }
  return highestSelectable
}

const getSelectedWithLowestX = () => {
  let lowestX = Infinity
  let lowestSelectable = selectedProtelAvailabilitySelectables.value[0]
  for (const selectable of selectedProtelAvailabilitySelectables.value) {
    if (selectable.element.getBoundingClientRect().x < lowestX) {
      lowestX = selectable.element.getBoundingClientRect().x
      lowestSelectable = selectable
    }
  }
  return lowestSelectable
}

const updateWidthOfOverlay = () => {
  const lastSelectable = getSelectedWithHighestX()
  if (!overlayDiv.value) return
  const overlayDivWidth = overlayDiv.value.getBoundingClientRect().width
  const overlayDivEndX =
    overlayDiv.value.getBoundingClientRect().x + overlayDiv.value.getBoundingClientRect().width

  const difference = overlayDivEndX - lastSelectable.element.getBoundingClientRect().x
  const newOverlayDivWidth =
    overlayDivWidth - difference + lastSelectable.element.getBoundingClientRect().width / 2
  overlayDiv.value.style.width = newOverlayDivWidth + 'px'

  const firstSelectable = getSelectedWithLowestX()
  if (firstSelectable) {
    const selectableLeftX = firstSelectable.element.getBoundingClientRect().x
    const diff = overlayDiv.value.getBoundingClientRect().x - selectableLeftX
    const newLeft =
      parseInt(overlayDiv.value.style.left) -
      diff +
      firstSelectable.element.getBoundingClientRect().width / 2
    overlayDiv.value.style.left = newLeft + 'px'
  }
}

const numberOfNights = computed(() => {
  const selectedProtelAvailabilities = protelAvailabilitySelectables.value.filter((p) => p.selected)

  const nights = dateHelper.calculateNightsBetweenDates(
    selectedProtelAvailabilities[0]?.availability?.availability_start,
    selectedProtelAvailabilities[selectedProtelAvailabilities.length - 1]?.availability
      ?.availability_end
  )

  return isNaN(nights) ? 0 : nights
})

const showSelectBar = ref(false)

const addSelectBar = async (availabilitySelectable: IProtelAvailabilitySelectable) => {
  showSelectBar.value = true
  if (!overlayDiv.value) return
  await nextTick()
  const ref = availabilitySelectable.element
  overlayDiv.value.style.left = 0 + 'px'
  const difference = ref.getBoundingClientRect().x - overlayDiv.value.getBoundingClientRect().x
  const width = ref.getBoundingClientRect().width / 2
  overlayDiv.value.style.left = difference + width + 'px'
  overlayDivStartX.value = ref.getBoundingClientRect().x
  overlayDivEndX.value =
    overlayDiv.value.getBoundingClientRect().x + overlayDiv.value.getBoundingClientRect().width
  setSelectedProtelAvailabilities()
}
</script>
<style scoped>
.resizable {
  position: relative;
  border-radius: 0.25rem;
  height: 2rem;
  width: 50px;
  background-color: #5cb4ef;
  opacity: 0.9;
  margin-top: 0.6rem;
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
    <div
      v-show="showSelectBar"
      class="resizable text-white"
      ref="overlayDiv"
      style="position: absolute"
    >
      <div
        class="resizer resizer--l"
        ref="leftHandle"
        @mousedown="mouseDownOnLeftHandle($event)"
      ></div>
      <div class="d-flex align-center justify-space-between h-100 w-100">
        <div @mousedown="mouseDownOnLeftHandle($event)">
          <v-icon color="white">mdi-menu-left</v-icon>
        </div>
        <div class="flex-grow-1 text-center" @mousedown="mouseDownCenterHandle($event)">
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
      refx="itemRefs"
      :ref="
        (el) => {
          availabilitySelectable.element = el
        }
      "
      class="text-center border-primary rounded availability-box-width"
      @click="addSelectBar(availabilitySelectable)"
    >
      <div class="mr-3 px-5 py-2 my-2 text-center availability-inner-box">
        {{ availabilitySelectable.availability?.rates_data[0]?.room_rate }}
      </div>
    </div>
  </div>
</template>
