<script setup lang="ts">
import type { IProtelAvailability } from '@/shared/interfaces/protel/IProtelAvailability'
import { onMounted, ref, type Ref } from 'vue'

const props = defineProps({
  protelAvailabilities: { type: Object as () => IProtelAvailability[], required: true }
})

const selectedProtelAvailabilities = ref<IProtelAvailability[]>([])

const overlayDivEndX = ref<number>(0)
const overlayDivStartX = ref<number>(0)

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
    console.log(itemRefs.value)
    selectedProtelAvailabilities.value = []
    for (const item of itemRefs.value) {
      const itemStartX = item.getBoundingClientRect().x
      const itemEndX = item.getBoundingClientRect().x + item.getBoundingClientRect().width
      if (overlayDivStartX.value < itemEndX && overlayDivEndX.value > itemStartX) {
        selectedProtelAvailabilities.value.push(
          props.protelAvailabilities[itemRefs.value.indexOf(item)]
        )
      }
    }
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

onMounted(() => {
  if (!overlayDiv.value) return
  overlayDiv.value.style.width = '100px'
})

const itemRefs: Ref<HTMLDivElement[]> = ref([])
</script>
<style scoped>
.resizable {
  position: relative;
  border: 1px solid rgb(203 213 225);
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

.resizer--b {
  cursor: row-resize;

  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);

  height: 0.25rem;
  width: 2rem;
}

.resizer {
  background: transparent;
}
.resizable:hover .resizer {
  background: rgb(99 102 241);
}
</style>
<template>
  <h1>Selected:</h1>
  <div v-for="availability of selectedProtelAvailabilities" :key="availability.id">
    {{ availability?.rates_data[0]?.room_rate }}
  </div>
  <div class="d-flex justify-space-between" style="position: relative">
    <div className="resizable" ref="overlayDiv" style="position: absolute">
      <div
        className="resizer resizer--r"
        ref="rightHandle"
        @mousedown="mouseDownOnRightHandle($event)"
      ></div>
      <div className="resizer resizer--b" />
    </div>
    <div
      v-for="availability of protelAvailabilities"
      :key="availability.id"
      ref="itemRefs"
      class="text-center border-primary rounded"
    >
      {{ availability?.rates_data[0]?.room_rate }}
    </div>
  </div>
</template>
