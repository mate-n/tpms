<script setup lang="ts">
import { RatesHelper } from '@/helpers/RatesHelper'
import type { IGuestsPerRoom } from '@/shared/interfaces/IGuestsPerRoom'
import type { ISelectBar } from '@/shared/interfaces/ISelectBar'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { computed, nextTick, ref, watch } from 'vue'
const ratesHelper = new RatesHelper()
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
const showSelectBar = ref(false)

const selectBars = ref<ISelectBar[]>([])

const selectedProtelAvailabilitySelectables = computed(() =>
  protelAvailabilitySelectables.value.filter((p) => p.selected)
)
const props = defineProps({
  protelAvailabilities: { type: Object as () => IProtelAvailability[], required: true },
  guestsPerRoom: { type: Object as () => IGuestsPerRoom, required: true }
})

watch(
  props,
  () => {
    showSelectBar.value = false

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

const mouseDownOnLeftHandleOfSelectbar = (e: MouseEvent, selectBar: ISelectBar) => {
  const startPositionOfMouse = {
    x: e.clientX,
    y: e.clientY
  }

  const leftPositionOfSelectBar = parseInt(selectBar.element.style.left)
  const widthOfSelectBar = parseInt(selectBar.element.style.width, 10)

  const handleMouseMoveOnLeftHandle = (e: MouseEvent) => {
    const dx = e.clientX - startPositionOfMouse.x

    selectBar.element.style.left = `${leftPositionOfSelectBar + dx}px`
    selectBar.element.style.width = `${widthOfSelectBar - dx}px`
  }

  const handleMouseUp = () => {
    afterMouseUp()
    lineUpSelectBarToCenters(selectBar)
    document.removeEventListener('mousemove', handleMouseMoveOnLeftHandle)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMoveOnLeftHandle)
  document.addEventListener('mouseup', handleMouseUp)
}

const mouseDownOnRightHandleOfSelectbar = (e: MouseEvent, selectBar: ISelectBar) => {
  const startPositionOfMouse = {
    x: e.clientX,
    y: e.clientY
  }

  const widthOfSelectBar = parseInt(selectBar.element.style.width, 10)

  const handleMouseMoveOnRightHandle = (e: MouseEvent) => {
    const dx = e.clientX - startPositionOfMouse.x
    selectBar.element.style.width = `${widthOfSelectBar + dx}px`
  }

  const handleMouseUp = () => {
    afterMouseUp()
    lineUpSelectBarToCenters(selectBar)
    document.removeEventListener('mousemove', handleMouseMoveOnRightHandle)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMoveOnRightHandle)
  document.addEventListener('mouseup', handleMouseUp)
}

const mouseDownOnCenterHandleOfSelectbar = (e: MouseEvent, selectBar: ISelectBar) => {
  const startPositionOfMouse = {
    x: e.clientX,
    y: e.clientY
  }

  const leftPositionOfSelectBar = parseInt(selectBar.element.style.left)

  const handleMouseMoveOnCenterHandle = (e: MouseEvent) => {
    const dx = e.clientX - startPositionOfMouse.x

    selectBar.element.style.left = `${leftPositionOfSelectBar + dx}px`
  }

  const handleMouseUp = () => {
    afterMouseUp()
    lineUpSelectBarToCenters(selectBar)
    document.removeEventListener('mousemove', handleMouseMoveOnCenterHandle)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMoveOnCenterHandle)
  document.addEventListener('mouseup', handleMouseUp)
}

const afterMouseUp = () => {
  castSelect()
}

const castSelect = () => {
  protelAvailabilitySelectables.value.forEach((p) => (p.selected = false))
  selectBars.value.forEach((s) => (s.protelAvailabilitySelectables = []))
  for (const selectable of protelAvailabilitySelectables.value) {
    for (const selectBar of selectBars.value) {
      if (isSelectableInsideSelectbar(selectable, selectBar)) {
        selectable.selected = true
        selectBar.protelAvailabilitySelectables.push(selectable)
      }
    }
  }
  emits(
    'selectedProtelAvailabilities',
    selectedProtelAvailabilitySelectables.value.map((p) => p.availability)
  )
}

const isSelectableInsideSelectbar = (
  selectable: IProtelAvailabilitySelectable,
  selectBar: ISelectBar
) => {
  const selectableEndX =
    selectable.element.getBoundingClientRect().x + selectable.element.getBoundingClientRect().width
  const selectBarStartX = selectBar.element.getBoundingClientRect().x
  const selectBarEndX =
    selectBar.element.getBoundingClientRect().x + selectBar.element.getBoundingClientRect().width
  return selectableEndX < selectBarEndX && selectableEndX > selectBarStartX
}

const lineUpSelectBarToCenters = (selectBar: ISelectBar) => {
  if (selectBar.protelAvailabilitySelectables.length === 0) {
    selectBars.value = selectBars.value.filter((s) => s.id !== selectBar.id)
    return
  }

  lineUpSelectBarToFirstAvailability(selectBar)
  lineUpSelectBarToLastAvailability(selectBar)
}

const lineUpSelectBarToLastAvailability = (selectBar: ISelectBar) => {
  const selectableWithTheHighestX = selectBar.protelAvailabilitySelectables.reduce(
    (prev, current) =>
      prev.element.getBoundingClientRect().x > current.element.getBoundingClientRect().x
        ? prev
        : current
  )

  const nextSelectableAfterSelectableWithHighestX = protelAvailabilitySelectables.value.find(
    (p) =>
      p.element.getBoundingClientRect().x >
      selectableWithTheHighestX.element.getBoundingClientRect().x
  )

  if (!nextSelectableAfterSelectableWithHighestX) return
  const diff =
    selectBar.element.getBoundingClientRect().x +
    selectBar.element.getBoundingClientRect().width -
    nextSelectableAfterSelectableWithHighestX.element.getBoundingClientRect().x

  const newWidth =
    selectBar.element.getBoundingClientRect().width -
    diff +
    nextSelectableAfterSelectableWithHighestX.element.getBoundingClientRect().width / 2

  selectBar.element.style.width = newWidth + 'px'
}

const lineUpSelectBarToFirstAvailability = (selectBar: ISelectBar) => {
  const selectableWithTheLowestX = selectBar.protelAvailabilitySelectables.reduce(
    (prev, current) =>
      prev.element.getBoundingClientRect().x < current.element.getBoundingClientRect().x
        ? prev
        : current
  )

  const diff =
    selectBar.element.getBoundingClientRect().x -
    selectableWithTheLowestX.element.getBoundingClientRect().x
  const newLeft =
    parseInt(selectBar.element.style.left) -
    diff +
    selectableWithTheLowestX.element.getBoundingClientRect().width / 2
  selectBar.element.style.left = newLeft + 'px'
}

const checkIfSelectBarAlreadyExists = (availabilitySelectable: IProtelAvailabilitySelectable) => {
  for (const selectBar of selectBars.value) {
    const startX = selectBar.element.getBoundingClientRect().x
    const endX =
      selectBar.element.getBoundingClientRect().x + selectBar.element.getBoundingClientRect().width
    const element = availabilitySelectable.element
    const elementStartX = element.getBoundingClientRect().x
    const elementEndX = element.getBoundingClientRect().x + element.getBoundingClientRect().width
    if (startX < elementEndX && endX > elementStartX) {
      return true
    }
  }
  return false
}

const addSelectBar = async (availabilitySelectable: IProtelAvailabilitySelectable) => {
  if (checkIfSelectBarAlreadyExists(availabilitySelectable)) {
    return
  }
  const availabilityElement = availabilitySelectable.element
  const availabilityElementHalfWidth = availabilityElement.getBoundingClientRect().width / 2

  const newSelectBar: ISelectBar = {
    id: new Date().getTime(),
    protelAvailabilitySelectables: []
  }
  selectBars.value.push(newSelectBar)
  await nextTick()
  const xDifference =
    availabilityElement.getBoundingClientRect().x - newSelectBar.element.getBoundingClientRect().x
  newSelectBar.element.style.left = xDifference + availabilityElementHalfWidth + 'px'
  newSelectBar.element.style.width = availabilityElement.getBoundingClientRect().width + 'px'
  castSelect()
  /*
  showSelectBar.value = true
  if (!overlayDiv.value) return
  await nextTick()
  overlayDiv.value.style.left = 0 + 'px'
  const difference = availabilityElement.getBoundingClientRect().x - overlayDiv.value.getBoundingClientRect().x
  overlayDiv.value.style.left = difference + availabilityElementHalfWidth + 'px'
  overlayDivStartX.value = availabilityElement.getBoundingClientRect().x
  overlayDivEndX.value =
    overlayDiv.value.getBoundingClientRect().x + overlayDiv.value.getBoundingClientRect().width
  setSelectedProtelAvailabilities()
  */
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
    <template v-for="selectBar of selectBars" :key="selectBar.id">
      <div
        class="resizable text-white"
        style="position: absolute"
        :ref="
          (el) => {
            selectBar.element = el
          }
        "
      >
        <div
          class="resizer resizer--l"
          @mousedown="mouseDownOnLeftHandleOfSelectbar($event, selectBar)"
        ></div>
        <div class="d-flex align-center justify-space-between h-100 w-100">
          <div @mousedown="mouseDownOnLeftHandleOfSelectbar($event, selectBar)">
            <v-icon color="white">mdi-menu-left</v-icon>
          </div>
          <div
            class="flex-grow-1 text-center"
            @mousedown="mouseDownOnCenterHandleOfSelectbar($event, selectBar)"
          >
            {{ selectBar.protelAvailabilitySelectables.length }}
          </div>
          <div @mousedown="mouseDownOnRightHandleOfSelectbar($event, selectBar)">
            <v-icon color="white">mdi-menu-right</v-icon>
          </div>
        </div>

        <div
          class="resizer resizer--r"
          @mousedown="mouseDownOnRightHandleOfSelectbar($event, selectBar)"
        ></div>
      </div>
    </template>
    <div
      v-for="availabilitySelectable of protelAvailabilitySelectables"
      :key="availabilitySelectable.availability.id"
      :ref="
        (el) => {
          availabilitySelectable.element = el
        }
      "
      class="text-center border-primary rounded availability-box-width"
      @click="addSelectBar(availabilitySelectable)"
    >
      <div
        class="mr-3 px-5 py-2 my-2 text-center availability-inner-box"
        :class="{
          'bg-lime-lighten-5': availabilitySelectable.selected,
          'bg-light': !availabilitySelectable.selected
        }"
      >
        {{
          ratesHelper.calculateActualRate(
            availabilitySelectable.availability?.rates_data[0],
            guestsPerRoom
          )
        }}
      </div>
    </div>
  </div>
</template>
