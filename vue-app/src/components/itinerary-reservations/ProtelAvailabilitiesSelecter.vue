<script setup lang="ts">
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import { DateHelper } from '@/helpers/DateHelper'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import { ProtelAvailabilitiesSelecterHelper } from '@/helpers/ProtelAvailabilitiesSelecterHelper'
import { RatesHelper } from '@/helpers/RatesHelper'
import { ProtelAvailabilityGroup } from '@/shared/classes/ProtelAvailabilityGroup'
import type { IReservation } from '@/shared/interfaces/IReservation'
import type { ISelectBar } from '@/shared/interfaces/ISelectBar'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilityGroup } from '@/shared/interfaces/protel/IProtelAvailabilityGroup'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { nextTick, ref, watch } from 'vue'
const dateHelper = new DateHelper()
const protelAvailabilitiesSelecterHelper = new ProtelAvailabilitiesSelecterHelper()
const ratesHelper = new RatesHelper()
const priceFormatter = new PriceFormatter()
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
const selectBars = ref<ISelectBar[]>([])
const availabilityHelper = new AvailabilityHelper()
const props = defineProps({
  roomTypeCode: { type: String, required: true }
})

const reservation = defineModel({ required: true, type: Object as () => IReservation })

const updateProtelAvailabilitySelectables = () => {
  protelAvailabilitySelectables.value = []
  const newAvailabilities = availabilityHelper.getAvailabilityByRoomTypeCode(
    reservation.value.protelAvailabilities,
    props.roomTypeCode
  )

  for (const protelAvailability of newAvailabilities) {
    protelAvailabilitySelectables.value.push({
      availability: protelAvailability,
      selected: false
    })
  }
}

watch(
  reservation,
  async () => {
    updateProtelAvailabilitySelectables()
    await nextTick()
    addSelectBars()
  },
  {
    immediate: true,
    deep: true
  }
)

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
    afterMouseUp(selectBar)
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
    afterMouseUp(selectBar)
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
    afterMouseUp(selectBar)
    lineUpSelectBarToCenters(selectBar)
    document.removeEventListener('mousemove', handleMouseMoveOnCenterHandle)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMoveOnCenterHandle)
  document.addEventListener('mouseup', handleMouseUp)
}

const afterMouseUp = (selectBar: ISelectBar) => {
  castSelect()
  removeOtherGroupsThatConflictOnDates(selectBar.protelAvailabilityGroup.availabilities)
}

const castSelect = () => {
  protelAvailabilitySelectables.value.forEach((p) => (p.selected = false))
  selectBars.value.forEach((s) => (s.protelAvailabilityGroup.availabilities = []))
  for (const selectable of protelAvailabilitySelectables.value) {
    for (const selectBar of selectBars.value) {
      if (canAvailabilityBeSelected(selectable, selectBar)) {
        selectable.selected = true
        selectBar.protelAvailabilityGroup.availabilities.push(selectable.availability)
      }
    }
  }
  updateSelectedProtelAvailabilityGroups()
}

const canAvailabilityBeSelected = (
  selectable: IProtelAvailabilitySelectable,
  selectBar: ISelectBar
) => {
  return (
    isSelectableInsideSelectbar(selectable, selectBar) &&
    !isAvailabilityOnLastDate(selectable.availability)
  )
}

const updateSelectedProtelAvailabilityGroups = () => {
  for (const selectBar of selectBars.value) {
    reservation.value.selectedProtelAvailabilityGroups =
      reservation.value.selectedProtelAvailabilityGroups.filter(
        (a) => a.id !== selectBar.protelAvailabilityGroup.id
      )

    if (selectBar.protelAvailabilityGroup.availabilities.length === 0) {
      selectBars.value = selectBars.value.filter((s) => s.id !== selectBar.id)
    } else {
      selectBar.protelAvailabilityGroup.guestsPerRoom = reservation.value.guestsPerRoom
      reservation.value.selectedProtelAvailabilityGroups.push(selectBar.protelAvailabilityGroup)
    }
  }
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
  if (selectBar.protelAvailabilityGroup.availabilities.length === 0) {
    selectBars.value = selectBars.value.filter((s) => s.id !== selectBar.id)
    return
  }

  lineUpSelectBarToFirstAvailability(selectBar)
  lineUpSelectBarToLastAvailability(selectBar)
}

const lineUpSelectBarToLastAvailability = (selectBar: ISelectBar) => {
  const correspondingProtelAvailabilitySelectable =
    protelAvailabilitiesSelecterHelper.getCorrespondingProtelAvailabilitySelectables(
      protelAvailabilitySelectables.value,
      selectBar.protelAvailabilityGroup
    )
  const selectableWithTheHighestX = protelAvailabilitiesSelecterHelper.getSelectableWithHighestX(
    correspondingProtelAvailabilitySelectable
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
  const correspondingProtelAvailabilitySelectable =
    protelAvailabilitiesSelecterHelper.getCorrespondingProtelAvailabilitySelectables(
      protelAvailabilitySelectables.value,
      selectBar.protelAvailabilityGroup
    )

  const selectableWithTheLowestX = protelAvailabilitiesSelecterHelper.getSelectableWithLowestX(
    correspondingProtelAvailabilitySelectable
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

const doesSelectBarAlreadyExist = (availabilityGroup: IProtelAvailabilityGroup) => {
  const foundSelectBar = selectBars.value.find(
    (s) => s.protelAvailabilityGroup.id === availabilityGroup.id
  )
  if (foundSelectBar) {
    return true
  }
  return false
}

const addSelectBars = async () => {
  selectBars.value = []
  for (const availabilityGroup of reservation.value.selectedProtelAvailabilityGroups) {
    if (!doesSelectBarAlreadyExist(availabilityGroup)) {
      if (availabilityGroup.roomTypeCode === props.roomTypeCode) {
        await addSelectBarForAvailabilityGroup(availabilityGroup)
      }
    }
  }
}

const addSelectBarForAvailabilityGroup = async (availabilityGroup: IProtelAvailabilityGroup) => {
  const newSelectBar: ISelectBar = {
    id: new Date().getTime(),
    protelAvailabilityGroup: availabilityGroup
  }
  selectBars.value.push(newSelectBar)
  await nextTick()

  const correspondingProtelAvailabilitySelectable =
    protelAvailabilitiesSelecterHelper.getCorrespondingProtelAvailabilitySelectables(
      protelAvailabilitySelectables.value,
      availabilityGroup
    )

  const selectableWithTheLowestX = protelAvailabilitiesSelecterHelper.getSelectableWithLowestX(
    correspondingProtelAvailabilitySelectable
  )

  const availabilityElement = selectableWithTheLowestX.element
  const availabilityElementHalfWidth = availabilityElement.getBoundingClientRect().width / 2

  const xDifference =
    availabilityElement.getBoundingClientRect().x - newSelectBar.element.getBoundingClientRect().x
  newSelectBar.element.style.left = xDifference + availabilityElementHalfWidth + 'px'
  newSelectBar.element.style.width = availabilityElement.getBoundingClientRect().width + 'px'

  const selectableWithTheHighestX = protelAvailabilitiesSelecterHelper.getSelectableWithHighestX(
    correspondingProtelAvailabilitySelectable
  )

  const nextSelectableAfterSelectableWithHighestX = protelAvailabilitySelectables.value.find(
    (p) =>
      p.element.getBoundingClientRect().x >
      selectableWithTheHighestX.element.getBoundingClientRect().x
  )

  if (!nextSelectableAfterSelectableWithHighestX) return

  const diff =
    newSelectBar.element.getBoundingClientRect().x +
    newSelectBar.element.getBoundingClientRect().width -
    nextSelectableAfterSelectableWithHighestX.element.getBoundingClientRect().x

  const newWidth =
    newSelectBar.element.getBoundingClientRect().width -
    diff +
    nextSelectableAfterSelectableWithHighestX.element.getBoundingClientRect().width / 2

  newSelectBar.element.style.width = newWidth + 'px'
}

const removeGroupsFromReservation = (groupsToBeRemoved: IProtelAvailabilityGroup[]) => {
  for (const group of groupsToBeRemoved) {
    reservation.value.selectedProtelAvailabilityGroups =
      reservation.value.selectedProtelAvailabilityGroups.filter((g) => g.id !== group.id)
  }
}

const removeOtherGroupsThatConflictOnDates = (availabilities: IProtelAvailability[]) => {
  for (const availability of availabilities) {
    removeOtherGroupsThatConflictOnDate(availability)
  }
}

const removeOtherGroupsThatConflictOnDate = (availability: IProtelAvailability) => {
  const isDateOccupied = protelAvailabilitiesSelecterHelper.isDateOccupied(
    availability.availability_start,
    reservation.value.selectedProtelAvailabilityGroups
  )

  if (isDateOccupied) {
    let groupsToBeRemoved =
      protelAvailabilitiesSelecterHelper.getProtelAvailabilityGroupsThatHaveAvailabilityOnDate(
        availability.availability_start,
        reservation.value.selectedProtelAvailabilityGroups
      )

    groupsToBeRemoved = groupsToBeRemoved.filter((g) => g.roomTypeCode !== props.roomTypeCode)

    removeGroupsFromReservation(groupsToBeRemoved)
  }
}

const isThereAlreadySelectBar = (availabilitySelectable: IProtelAvailabilitySelectable) => {
  for (const selectBar of selectBars.value) {
    for (const availability of selectBar.protelAvailabilityGroup.availabilities) {
      if (availability.id === availabilitySelectable.availability.id) {
        return true
      }
    }
  }
  return false
}

const isAvailabilityOnLastDate = (availability: IProtelAvailability) => {
  return dateHelper.isSameDay(availability.availability_start, reservation.value.departureDate)
}

const checkIfSelectBarCanBePlaced = (availabilitySelectable: IProtelAvailabilitySelectable) => {
  return (
    isThereAlreadySelectBar(availabilitySelectable) ||
    isAvailabilityOnLastDate(availabilitySelectable.availability)
  )
}

const addSelectBar = async (availabilitySelectable: IProtelAvailabilitySelectable) => {
  if (checkIfSelectBarCanBePlaced(availabilitySelectable)) {
    return
  }
  removeOtherGroupsThatConflictOnDate(availabilitySelectable.availability)

  const newProtelAvailabilityGroup = new ProtelAvailabilityGroup()
  newProtelAvailabilityGroup.roomTypeCode = props.roomTypeCode
  const newSelectBar: ISelectBar = {
    id: new Date().getTime(),
    protelAvailabilityGroup: newProtelAvailabilityGroup
  }
  selectBars.value.push(newSelectBar)
  await nextTick()

  const availabilityElement = availabilitySelectable.element
  const availabilityElementHalfWidth = availabilityElement.getBoundingClientRect().width / 2

  const xDifference =
    availabilityElement.getBoundingClientRect().x - newSelectBar.element.getBoundingClientRect().x
  newSelectBar.element.style.left = xDifference + availabilityElementHalfWidth + 'px'
  newSelectBar.element.style.width = availabilityElement.getBoundingClientRect().width + 'px'
  castSelect()
}
</script>
<style scoped>
.resizable {
  position: relative;
  border-radius: 0.25rem;
  height: 3rem;
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

  height: 3rem;
  width: 0.25rem;
}

.resizer--l {
  cursor: col-resize;

  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);

  height: 3rem;
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
          <div
            class="h-100 d-flex align-center"
            @mousedown="mouseDownOnLeftHandleOfSelectbar($event, selectBar)"
          >
            <v-icon color="white">mdi-menu-left</v-icon>
          </div>
          <div
            class="flex-grow-1 text-center"
            @mousedown="mouseDownOnCenterHandleOfSelectbar($event, selectBar)"
          >
            {{ selectBar.protelAvailabilityGroup.availabilities.length }}
          </div>
          <div
            class="h-100 d-flex align-center"
            @mousedown="mouseDownOnRightHandleOfSelectbar($event, selectBar)"
          >
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
            {{
              priceFormatter.formatPrice(
                ratesHelper.calculateActualRate(
                  availabilitySelectable.availability?.rates_data[0],
                  reservation.guestsPerRoom
                )
              )
            }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
