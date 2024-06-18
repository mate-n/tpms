<script setup lang="ts">
import { onMounted, ref } from 'vue'

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

    const dx = e.clientX - startPos.x
    overlayDiv.value.style.width = `${w + dx}px`
  }

  const handleMouseUp = () => {
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
  DragDemo

  <hr />
  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr style="height: 4rem; display: block; position: relative">
      <div className="resizable" ref="overlayDiv" style="position: absolute">
        <div
          className="resizer resizer--r"
          ref="rightHandle"
          @mousedown="mouseDownOnRightHandle($event)"
        ></div>
        <div className="resizer resizer--b" />
      </div>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </table>
</template>
