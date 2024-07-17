<script setup lang="ts">
import { AvailabilityHelper } from '@/helpers/AvailabilityHelper'
import { DateHelper } from '@/helpers/DateHelper'
import { PriceFormatter } from '@/helpers/PriceFormatter'
import type { IItineraryReservation } from '@/shared/interfaces/IItineraryReservation'
import type { IProtelReservationSelectUpdate } from '@/shared/interfaces/IProtelReservationSelectUpdate'
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import type { IProtelAvailabilitySelectable } from '@/shared/interfaces/protel/IProtelAvailabilitySelectable'
import { nextTick, ref, watch } from 'vue'
const priceFormatter = new PriceFormatter()
const dateHelper = new DateHelper()
const availabilityHelper = new AvailabilityHelper()
const isSelecting = ref<boolean>(false)
const startSelectingAt = ref<IProtelAvailabilitySelectable | null>(null)
const protelAvailabilitySelectables = ref<IProtelAvailabilitySelectable[]>([])
const props = defineProps({
  roomTypeCode: { type: String, required: true },
  propertyCode: { type: String, required: true },
  allAvailabilities: { type: Array as () => IProtelAvailability[], required: true },
  arrivalDate: { type: Object as () => Date, required: true },
  departureDate: { type: Object as () => Date, required: true },
  ItineraryReservation: { type: Object as () => IItineraryReservation, required: true }
})

const emits = defineEmits(['availabilities-selected'])

const resetProtelAvailabilitySelectables = () => {
  protelAvailabilitySelectables.value = []

  const availabilities = availabilityHelper.getAvailabilityByRoomTypeCode(
    props.allAvailabilities,
    props.roomTypeCode
  )

  for (const protelAvailability of availabilities) {
    protelAvailabilitySelectables.value.push({
      availability: protelAvailability,
      selected: false
    })
  }
}

const updateAvailabilitySelectables = (availability: IProtelAvailability, selected: boolean) => {
  protelAvailabilitySelectables.value = protelAvailabilitySelectables.value.map(
    (item: IProtelAvailabilitySelectable) => {
      if (availability.id !== item.availability.id) return item
      return { ...item, selected }
    }
  )

  const selectedAvailabilities = protelAvailabilitySelectables.value
    .filter(({ selected }) => selected)
    .map(({ availability }) => availability)

  const protelReservationSelectUpdate: IProtelReservationSelectUpdate = {
    selectedAvailabilities: selectedAvailabilities,
    roomTypeCode: props.roomTypeCode,
    property_code: props.allAvailabilities[0].property_code,
    guestsPerRoom: undefined
  }

  emits('availabilities-selected', protelReservationSelectUpdate)
}

const handleMouseDown = (
  availabilitySelectable: IProtelAvailabilitySelectable,
  event: MouseEvent
) => {
  const { availability, selected } = availabilitySelectable

  // toggle selected item by holding "ctrl" key
  if (event.ctrlKey || event.metaKey) {
    updateAvailabilitySelectables(availability, !selected)
    return
  }

  // start "Selecting" flow
  isSelecting.value = true
  startSelectingAt.value = availabilitySelectable
  resetProtelAvailabilitySelectables()
  updateAvailabilitySelectables(availability, true)
}

const handleMouseMove = ({ availability }: IProtelAvailabilitySelectable) => {
  if (!isSelecting.value) return

  // select item when the mouse is moving over it
  updateAvailabilitySelectables(availability, true)
}

const handleMouseLeave = ({ availability }: IProtelAvailabilitySelectable, event: MouseEvent) => {
  if (!isSelecting.value || !startSelectingAt.value?.element) return

  // mouse is leaving from the start item, don't need to check it
  if (startSelectingAt.value.availability?.id === availability.id) {
    return
  }

  // mouse is leaving from the another item, we should check if user want to select this item
  const itemElement = event.target as HTMLDivElement
  const startAtElement = startSelectingAt.value.element as HTMLDivElement

  const { clientX: mouseX } = event
  const { x: itemX, left: itemLeft, right: itemRight } = itemElement.getBoundingClientRect()
  const { x: startX } = startAtElement.getBoundingClientRect()

  let selected = false
  if (startX < itemX) {
    // user is selecting from left to right
    selected = mouseX >= itemRight
  } else {
    // user is selecting from right to left
    selected = mouseX <= itemLeft
  }
  updateAvailabilitySelectables(availability, selected)
}

const handleMouseUp = () => {
  // stop "Selecting" flow
  isSelecting.value = false
  startSelectingAt.value = null
}

watch(
  [() => props.allAvailabilities, () => props.roomTypeCode],
  async () => {
    resetProtelAvailabilitySelectables()
    await nextTick()
  },
  {
    immediate: true,
    deep: true
  }
)

const setSelectedAvailabilities = () => {
  for (const selectable of protelAvailabilitySelectables.value) {
    selectable.selected = false
  }

  for (const selectable of protelAvailabilitySelectables.value) {
    selectable.selected = false
    const reservations = props.ItineraryReservation.protelReservations.filter(
      (reservation) =>
        reservation.roomTypeCode === props.roomTypeCode &&
        reservation.property_code === props.propertyCode
    )

    for (const reservation of reservations) {
      const dayBeforeDeparture = dateHelper.addDays(new Date(reservation.departureDate), -1)
      if (
        dateHelper.isDateBetweenDates(
          selectable.availability.availability_start,
          reservation.arrivalDate,
          dayBeforeDeparture
        )
      ) {
        selectable.selected = true
      }
    }
  }
}

watch(
  [() => props.ItineraryReservation.protelReservations],
  async () => {
    setSelectedAvailabilities()
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
          style="margin-bottom: 0.2rem; user-select: none"
        >
          {{ availabilitySelectable.availability.availability_count }}
        </div>
        <div
          class="py-1"
          :class="{
            'bg-yellow': availabilitySelectable.selected,
            'bg-white': !availabilitySelectable.selected
          }"
          style="user-select: none"
        >
          <template v-if="availabilitySelectable.availability?.rates_data">
            {{
              priceFormatter.formatPriceString(
                availabilitySelectable.availability?.rates_data[0].room_rate
              )
            }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
